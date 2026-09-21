import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  REVIEW_COMMENT_MAX,
  REVIEW_COMMENT_MIN,
  REVIEW_RATING_MAX,
  REVIEW_RATING_MIN,
  ReviewError,
  createBackendReview,
  deriveDisplayName,
  deleteBackendReview,
  fetchProductReviews,
  updateBackendReview,
} from "../../../lib/reviews";

// Reviews are created/updated through the app's own route handlers so the
// Clerk session is resolved server-side. The product backend does not store
// an author identifier, so review ownership is tracked in the Clerk user's
// `publicMetadata.reviews` map (`productId -> reviewId`).

export const runtime = "nodejs";
// Always run dynamically: every request carries a Clerk session.
export const dynamic = "force-dynamic";

type ReviewOwnership = Record<string, string>;

function getReviewsMap(user: { publicMetadata?: unknown }): ReviewOwnership {
  const raw = (user.publicMetadata as { reviews?: unknown } | undefined)?.reviews;
  return raw && typeof raw === "object" && !Array.isArray(raw)
    ? (raw as ReviewOwnership)
    : {};
}

async function resolveRequestContext() {
  const session = await auth();
  const userId = session.userId;
  if (!userId) {
    throw new ReviewError(
      "unauthenticated",
      "Vous devez être connecté pour laisser un avis.",
      401,
    );
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const displayName = deriveDisplayName({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  return { userId, client, user, displayName, owned: getReviewsMap(user) };
}

function validatePayload(body: unknown): {
  rating: number;
  comment: string;
  title: string;
} {
  const value = body as {
    rating?: unknown;
    comment?: unknown;
    body?: unknown;
    title?: unknown;
  };

  // Accept both the documented `comment` field and the product backend's
  // `body` field, so a stale client payload can still be validated.
  const rawComment = value.comment ?? value.body;
  const comment = typeof rawComment === "string" ? rawComment.trim() : "";
  const rating = Number(value.rating);
  const title = typeof value.title === "string" ? value.title.trim() : "";

  if (
    !Number.isInteger(rating) ||
    rating < REVIEW_RATING_MIN ||
    rating > REVIEW_RATING_MAX
  ) {
    throw new ReviewError(
      "invalid-rating",
      `La note doit être un entier entre ${REVIEW_RATING_MIN} et ${REVIEW_RATING_MAX}.`,
      422,
    );
  }

  if (comment.length < REVIEW_COMMENT_MIN) {
    throw new ReviewError(
      "invalid-comment",
      `Votre avis doit contenir au moins ${REVIEW_COMMENT_MIN} caractères.`,
      422,
    );
  }

  if (comment.length > REVIEW_COMMENT_MAX) {
    throw new ReviewError(
      "invalid-comment",
      `Votre avis ne peut pas dépasser ${REVIEW_COMMENT_MAX} caractères.`,
      422,
    );
  }

  return { rating, comment, title };
}

/** Reads a JSON body, rejecting oversized payloads. */
async function readJsonBody(request: NextRequest): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_000) {
    throw new ReviewError(
      "invalid-comment",
      "Le contenu envoyé est trop volumineux.",
      413,
    );
  }

  let text: string;
  try {
    text = await request.text();
  } catch {
    throw new ReviewError("invalid-comment", "Requête invalide.", 400);
  }

  if (text.length > 32_000) {
    throw new ReviewError(
      "invalid-comment",
      "Le contenu envoyé est trop volumineux.",
      413,
    );
  }

  try {
    return JSON.parse(text || "{}");
  } catch {
    throw new ReviewError("invalid-comment", "JSON invalide.", 400);
  }
}

function jsonError(error: unknown, fallbackStatus = 500) {
  if (error instanceof ReviewError) {
    return NextResponse.json(
      { success: false, message: error.message, code: error.code },
      { status: error.status },
    );
  }
  const message =
    error instanceof Error ? error.message : "Une erreur est survenue.";
  return NextResponse.json(
    { success: false, message, code: "backend-error" },
    { status: fallbackStatus },
  );
}

function productIdFrom(request: NextRequest): string {
  return request.headers.get("x-ironz-product-id") || "";
}

// ── POST /api/reviews ──────────────────────────────────────────────────
// Creates a review, or replaces the same user's existing review on the
// same product (one active review per user per product).

export async function POST(request: NextRequest) {
  try {
    const { userId, client, user, displayName, owned } =
      await resolveRequestContext();
    const { rating, comment, title } = validatePayload(await readJsonBody(request));

    const productId = productIdFrom(request);
    if (!productId) {
      throw new ReviewError(
        "product-not-found",
        "Produit introuvable.",
        404,
      );
    }

    // One active review per user per product. An existing review is updated
    // in place rather than duplicated.
    const existingReviewId = owned[productId];
    if (existingReviewId) {
      const updated = await updateBackendReview(productId, existingReviewId, {
        productId,
        rating,
        body: comment,
        title,
        username: displayName,
      });
      return NextResponse.json({
        success: true,
        message: "Votre avis a été mis à jour.",
        review: { ...updated, isOwner: true },
      });
    }

    const created = await createBackendReview(productId, {
      productId,
      rating,
      body: comment,
      title,
      username: displayName,
    });

    const reviewId = created._id;
    if (reviewId) {
      try {
        await client.users.updateUser(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            reviews: { ...owned, [productId]: reviewId },
          },
        });
      } catch {
        // The review is persisted on the product backend; failing to record
        // ownership only disables the edit path, so it is not fatal.
      }
    }

    return NextResponse.json({
      success: true,
      message: "Merci ! Votre avis a été publié.",
      review: { ...created, isOwner: true },
    });
  } catch (error) {
    return jsonError(error);
  }
}

// ── PUT /api/reviews ────────────────────────────────────────────────────
// Updates the caller's own review on a product.

export async function PUT(request: NextRequest) {
  try {
    const { userId, client, user, displayName, owned } =
      await resolveRequestContext();
    const body = await readJsonBody(request);
    const { rating, comment, title } = validatePayload(body);

    const productId = productIdFrom(request);
    const requestedReviewId =
      (body as { reviewId?: string }).reviewId || owned[productId];

    if (!productId || !requestedReviewId) {
      throw new ReviewError(
        "not-owner",
        "Avis introuvable ou vous n'en êtes pas l'auteur.",
        404,
      );
    }

    // The client-supplied identity is never trusted: ownership is resolved
    // from the Clerk session only.
    if (owned[productId] !== requestedReviewId) {
      throw new ReviewError(
        "not-owner",
        "Vous ne pouvez modifier que votre propre avis.",
        403,
      );
    }

    const updated = await updateBackendReview(productId, requestedReviewId, {
      productId,
      rating,
      body: comment,
      title,
      username: displayName,
    });

    return NextResponse.json({
      success: true,
      message: "Votre avis a été mis à jour.",
      review: { ...updated, isOwner: true },
    });
  } catch (error) {
    return jsonError(error);
  }
}

// ── DELETE /api/reviews ──────────────────────────────────────────────────
// Deletes the caller's own review on a product.

export async function DELETE(request: NextRequest) {
  try {
    const { userId, client, user, owned } = await resolveRequestContext();

    const productId = productIdFrom(request);
    if (!productId || !owned[productId]) {
      throw new ReviewError(
        "not-owner",
        "Avis introuvable ou vous n'en êtes pas l'auteur.",
        404,
      );
    }

    const reviewId = owned[productId];
    await deleteBackendReview(productId, reviewId);

    const nextOwned = { ...owned };
    delete nextOwned[productId];
    try {
      await client.users.updateUser(userId, {
        publicMetadata: { ...user.publicMetadata, reviews: nextOwned },
      });
    } catch {
      // Ownership bookkeeping is best-effort after a successful delete.
    }

    return NextResponse.json({ success: true, message: "Votre avis a été supprimé." });
  } catch (error) {
    return jsonError(error);
  }
}

// ── GET /api/reviews?productId=… ────────────────────────────────────────
// Public: anyone can read reviews. The caller's own review is flagged so
// the UI can render an edit state instead of a second submission form.

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId") || "";
    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Produit introuvable.", code: "product-not-found" },
        { status: 404 },
      );
    }

    const [reviews, session] = await Promise.all([
      fetchProductReviews(productId),
      auth(),
    ]);

    let ownedReviewId: string | undefined;
    if (session.userId) {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(session.userId);
        ownedReviewId = getReviewsMap(user)[productId];
      } catch {
        // Public read must not fail when the Clerk lookup fails.
        ownedReviewId = undefined;
      }
    }

    const withOwnership = reviews.map((review) => ({
      ...review,
      isOwner: Boolean(review._id && review._id === ownedReviewId),
    }));

    return NextResponse.json({
      success: true,
      count: withOwnership.length,
      average: withOwnership.length
        ? withOwnership.reduce((s, r) => s + (Number(r.rating) || 0), 0) /
          withOwnership.length
        : 0,
      reviews: withOwnership,
    });
  } catch (error) {
    return jsonError(error);
  }
}
