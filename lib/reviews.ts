/**
 * Product review utilities shared by the review API routes and the
 * product detail UI.
 *
 * Reviews are persisted by the existing product backend (AWS Lambda,
 * `NEXT_PUBLIC_API_URL`). The backend keeps a per-product `reviews[]`
 * array and re-computes `rating` / `reviewCount` on every mutation.
 *
 * Ownership of a review is tracked in the Clerk user's `publicMetadata`
 * (`reviews` map: `<productId> -> <reviewId>`), because the product
 * backend does not store an author identifier next to a review.
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://cts4hw2cbnwl4ur7zp6acy6cyy0jnxeo.lambda-url.eu-north-1.on.aws/api";

export const REVIEW_COMMENT_MIN = 10;
export const REVIEW_COMMENT_MAX = 2000;
export const REVIEW_RATING_MIN = 1;
export const REVIEW_RATING_MAX = 5;

/** A review record as stored by the product backend. */
export interface ReviewRecord {
  _id?: string;
  username: string;
  title?: string;
  body: string;
  rating: number;
  verified?: boolean;
  date?: string | { $date: string };
  createdAt?: string | { $date: string };
  updatedAt?: string | { $date: string };
}

export interface ReviewPayload {
  productId: string;
  /** Display name resolved server-side from the Clerk profile. */
  username?: string;
  title?: string;
  body: string;
  rating: number;
}

/** Result of a review mutation, with a stable shape for the client. */
export interface ReviewResult {
  success: boolean;
  message: string;
  review?: ReviewRecord;
  /** Stable error code the client can map to a French message. */
  code?:
    | "unauthenticated"
    | "unauthorized"
    | "product-not-found"
    | "invalid-rating"
    | "invalid-comment"
    | "already-reviewed"
    | "not-owner"
    | "backend-error"
    | "rate-limited";
}

export class ReviewError extends Error {
  code: ReviewResult["code"];
  status: number;

  constructor(code: ReviewResult["code"], message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

/** Extracts the review rows from a product-backend response. */
function productRows(payload: unknown): ReviewRecord[] {
  if (!payload || typeof payload !== "object") return [];
  const candidate = payload as { data?: unknown; products?: unknown };
  if (Array.isArray(candidate.data)) return candidate.data as ReviewRecord[];
  if (Array.isArray(candidate.products))
    return candidate.products as ReviewRecord[];
  if (Array.isArray(payload)) return payload as ReviewRecord[];
  return [];
}

/** Reads a single product (with its `reviews[]`) from the product backend. */
export async function fetchProductReviews(
  productId: string,
): Promise<ReviewRecord[]> {
  if (!productId) return [];
  const res = await fetch(`${API_URL}/products/${encodeURIComponent(productId)}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  const product = (json.data || json) as { reviews?: ReviewRecord[] };
  return Array.isArray(product.reviews) ? product.reviews : [];
}

/** Creates a review on the product backend and returns the stored record. */
export async function createBackendReview(
  productId: string,
  payload: ReviewPayload,
): Promise<ReviewRecord> {
  const res = await fetch(
    `${API_URL}/products/${encodeURIComponent(productId)}/reviews`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: payload.username,
        title: payload.title?.trim() || "",
        body: payload.body,
        rating: payload.rating,
        verified: false,
      }),
    },
  );

  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!res.ok) {
    const message =
      (json && (json as { message?: string }).message) ||
      `Backend returned ${res.status}`;
    throw new ReviewError("backend-error", message, res.status);
  }

  const created = (json as { data?: ReviewRecord }).data;
  if (!created) {
    throw new ReviewError("backend-error", "Réponse invalide du serveur", 502);
  }
  return created;
}

/** Updates an existing review on the product backend. */
export async function updateBackendReview(
  productId: string,
  reviewId: string,
  payload: ReviewPayload,
): Promise<ReviewRecord> {
  const res = await fetch(
    `${API_URL}/products/${encodeURIComponent(productId)}/reviews/${encodeURIComponent(reviewId)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: payload.username,
        title: payload.title?.trim() || "",
        body: payload.body,
        rating: payload.rating,
        verified: false,
      }),
    },
  );

  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!res.ok) {
    const message =
      (json && (json as { message?: string }).message) ||
      `Backend returned ${res.status}`;
    throw new ReviewError("backend-error", message, res.status);
  }

  const updated = (json as { data?: ReviewRecord }).data;
  if (!updated) {
    throw new ReviewError("backend-error", "Réponse invalide du serveur", 502);
  }
  return updated;
}

/** Deletes a review on the product backend. */
export async function deleteBackendReview(
  productId: string,
  reviewId: string,
): Promise<void> {
  const res = await fetch(
    `${API_URL}/products/${encodeURIComponent(productId)}/reviews/${encodeURIComponent(reviewId)}`,
    { method: "DELETE" },
  );
  if (!res.ok) {
    const text = await res.text();
    let message = `Backend returned ${res.status}`;
    try {
      message = (JSON.parse(text) as { message?: string }).message || message;
    } catch {}
    throw new ReviewError("backend-error", message, res.status);
  }
}

/**
 * Normalizes a string or `{ $date }` BSON value into a `Date`.
 * Returns `undefined` when the value is missing or not a valid date.
 */
export function reviewDate(value?: string | { $date: string }): Date | undefined {
  if (!value) return undefined;
  const raw = typeof value === "object" && "$date" in value ? value.$date : value;
  const date = raw ? new Date(String(raw)) : new Date(0);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/** Formats a review date for display, e.g. "20 septembre 2026". */
export function formatReviewDate(value?: string | { $date: string }): string {
  const date = reviewDate(value);
  if (!date) return "";
  return date.toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Derives a public display name from Clerk profile data.
 * Never exposes the user's email address. Falls back to the
 * Clerk username, then to a neutral "Client vérifié".
 */
export function deriveDisplayName(user: {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}): string {
  const { firstName, lastName, username } = user;
  if (firstName && lastName) return `${firstName} ${lastName}`.trim();
  if (firstName) return firstName;
  if (lastName) return lastName;
  if (username) return username;
  return "Client IRONZ";
}

/** Public-safe view of a review record (no internal identifiers). */
export function toPublicReview(
  review: ReviewRecord,
  options: { isOwner?: boolean } = {},
): ReviewRecord & { isOwner: boolean } {
  return { ...review, isOwner: Boolean(options.isOwner) };
}

/** Average rating over a list of reviews. */
export function averageRating(reviews: ReviewRecord[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((total, r) => total + (Number(r.rating) || 0), 0);
  return sum / reviews.length;
}

/** Rating distribution 5 → 1 with percentages. */
export function ratingDistribution(reviews: ReviewRecord[]) {
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(Number(r.rating) || 0) === star)
      .length;
    return { star, count, percent: Math.round((count / total) * 100) };
  });
}

export const reviewApiUrl = API_URL;
