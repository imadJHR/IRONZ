"use client";

/**
 * "Avis clients" section for the product detail page.
 *
 * - Anonymous visitors: read-only reviews + a sign-in CTA.
 * - Authenticated visitors: review form, or the edit state of their own
 *   existing review (one active review per user per product).
 *
 * Mutations go through the app's own route handlers so the Clerk session
 * is resolved server-side (`auth()`). The client never sends an author
 * identity.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  ChevronRightIcon,
  QuoteMark,
  StarSolid,
  StarOutline,
  VerifiedCheck,
} from "../../components/reviews/icons";
import { StarInput } from "../../components/reviews/star-input";
import {
  averageRating,
  formatReviewDate,
  ratingDistribution,
  type ReviewRecord,
} from "../../lib/reviews";

interface ReviewsSectionProps {
  productId: string;
  productSlug: string;
  /** Reviews already shipped from the server (legacy + new). */
  initialReviews: ReviewRecord[];
  /** Public field from the product record (legacy aggregate). */
  declaredRating?: number;
  declaredReviewCount?: number;
}

type SubmissionState = "idle" | "submitting" | "success" | "error";

const FRENCH_ERRORS: Record<string, string> = {
  unauthenticated: "Vous devez être connecté pour laisser un avis.",
  unauthorized: "Vous devez être connecté pour laisser un avis.",
  "product-not-found": "Produit introuvable.",
  "invalid-rating": "La note doit être un entier entre 1 et 5.",
  "invalid-comment": "Votre avis doit contenir au moins 10 caractères.",
  "already-reviewed":
    "Vous avez déjà laissé un avis sur ce produit. Vous pouvez le modifier ci-dessous.",
  "not-owner": "Vous ne pouvez modifier que votre propre avis.",
  "backend-error": "Une erreur est survenue. Veuillez réessayer.",
  "rate-limited": "Trop d'envois. Veuillez patienter un instant.",
};

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ReviewsSection({
  productId,
  initialReviews,
}: ReviewsSectionProps) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [reviews, setReviews] = useState<ReviewRecord[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const myReview = useMemo(
    () => reviews.find((review) => (review as ReviewRecord & { isOwner?: boolean }).isOwner),
    [reviews],
  );

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const json = await res.json();
      setReviews(Array.isArray(json.reviews) ? json.reviews : []);
    } catch {
      // Keep the server-rendered reviews on failure.
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // Refresh ownership + reviews once auth state is known, so a returning
  // user sees their own review flagged without a manual reload.
  useEffect(() => {
    if (!isLoaded) return;
    void fetchReviews();
  }, [isLoaded, fetchReviews]);

  // Pre-fill the form when the user already has a review on this product.
  useEffect(() => {
    if (myReview) {
      setRating(Math.round(Number(myReview.rating) || 5));
      setComment(myReview.body || "");
      setTitle(myReview.title || "");
    }
  }, [myReview]);

  const resetForm = useCallback(() => {
    setRating(5);
    setComment("");
    setTitle("");
    setEditing(false);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (state === "submitting") return; // prevent accidental double POST
      setState("submitting");
      setErrorMessage("");

      const trimmed = comment.trim();
      if (trimmed.length < 10) {
        setState("error");
        setErrorMessage("Votre avis doit contenir au moins 10 caractères.");
        return;
      }
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        setState("error");
        setErrorMessage("La note doit être un entier entre 1 et 5.");
        return;
      }

      try {
        const res = await fetch("/api/reviews", {
          method: myReview ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "x-ironz-product-id": productId,
          },
          body: JSON.stringify({ rating, title: title.trim(), comment: trimmed }),
        });

        const json = await res.json().catch(() => ({}));

        if (!res.ok) {
          setState("error");
          const code = json?.code as string | undefined;
          setErrorMessage(FRENCH_ERRORS[code || ""] || json?.message || FRENCH_ERRORS["backend-error"]);
          return;
        }

        setState("success");
        if (myReview) setEditing(false);
        if (!myReview) resetForm();
        // Update the local list without a full refetch: the server returns
        // the persisted record.
        if (json.review) {
          setReviews((current) => {
            const without = current.filter((r) => r._id !== json.review._id);
            return [{ ...json.review, isOwner: true }, ...without];
          });
        }
        await fetchReviews();
      } catch {
        setState("error");
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    },
    [comment, rating, title, productId, state, myReview, resetForm, fetchReviews],
  );

  const handleDelete = useCallback(async () => {
    if (!myReview || state === "submitting") return;
    setState("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/reviews", {
        method: "DELETE",
        headers: { "x-ironz-product-id": productId },
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setState("error");
        setErrorMessage(FRENCH_ERRORS[json?.code] || FRENCH_ERRORS["backend-error"]);
        return;
      }
      resetForm();
      setReviews((current) => current.filter((r) => r._id !== myReview._id));
      setState("success");
    } catch {
      setState("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  }, [myReview, productId, state, resetForm]);

  const average = useMemo(() => averageRating(reviews), [reviews]);

  const displayCount = useMemo(() => reviews.length, [reviews]);

  const distribution = useMemo(() => ratingDistribution(reviews), [reviews]);
  const roundedAverage = Number(average.toFixed(1));

  const showSummary = roundedAverage > 0 || displayCount > 0;

  return (
    <section
      id="avis-clients"
      aria-labelledby="avis-clients-title"
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2
            id="avis-clients-title"
            className="font-display uppercase tracking-widest text-lg sm:text-xl text-gray-900 dark:text-white"
          >
            Avis clients
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {displayCount > 0
              ? `${displayCount} avis vérifié${displayCount > 1 ? "s" : ""} sur ce produit`
              : "Partagez votre expérience avec la communauté IRONZ"}
          </p>
        </div>
      </div>

      {/* ── Summary ── */}
      {showSummary && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
          <div className="text-center shrink-0">
            <p className="text-6xl font-display text-gray-900 dark:text-white leading-none">
              {roundedAverage.toFixed(1)}
            </p>
            <div className="flex justify-center gap-0.5 mt-1" aria-hidden="true">
              {[...Array(5)].map((_, i) =>
                i < Math.round(roundedAverage) ? (
                  <StarSolid key={i} className="w-4 h-4 text-yellow-400" />
                ) : (
                  <StarOutline key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                ),
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
              {displayCount || 0} avis
            </p>
          </div>
          <div className="flex-1 w-full space-y-1.5">
            {distribution.map(({ star, count, percent }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 w-4">{star}</span>
                <StarSolid className="w-3 h-3 text-yellow-400 shrink-0" />
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8 text-right">{percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Review cards ── */}
      <div className="space-y-4">
        {loading && reviews.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500">
            Chargement des avis...
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={String(review._id || review.body)} review={review} />
          ))
        ) : (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
              <QuoteMark className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Aucun avis pour le moment
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
              Soyez le premier à donner votre avis !
            </p>
          </div>
        )}
      </div>

      {/* ── Form / auth CTA ── */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 sm:p-6 space-y-4">
        {isLoaded && isSignedIn ? (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {myReview ? "Modifier votre avis" : "Laisser un avis"}
              </p>
              {state === "success" && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                  role="status"
                >
                  <VerifiedCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Publié
                </span>
              )}
            </div>

            <StarInput
              id="review-rating"
              label="Votre note"
              value={rating}
              onChange={setRating}
              disabled={state === "submitting"}
            />

            <div className="space-y-1.5">
              <label
                htmlFor="review-title"
                className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
              >
                Titre <span className="font-normal normal-case text-gray-400">(facultatif)</span>
              </label>
              <input
                id="review-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                disabled={state === "submitting"}
                placeholder="En quelques mots"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="review-comment"
                className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
              >
                Votre avis
              </label>
              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                minLength={10}
                maxLength={2000}
                disabled={state === "submitting"}
                placeholder="Décrivez votre expérience avec ce produit..."
                aria-describedby="review-comment-count review-comment-hint"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors resize-y disabled:opacity-60"
              />
              <div className="flex items-center justify-between gap-3">
                <span id="review-comment-hint" className="text-[11px] text-gray-400">
                  10 caractères minimum
                </span>
                <span
                  id="review-comment-count"
                  className={cn(
                    "text-[11px] tabular-nums",
                    comment.length > 1800 ? "text-red-500" : "text-gray-400",
                  )}
                  aria-live="polite"
                >
                  {comment.length}/2000
                </span>
              </div>
            </div>

            {state === "error" && errorMessage && (
              <p
                className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2"
                role="alert"
              >
                <span aria-hidden="true" className="mt-0.5">⚠</span>
                <span>{errorMessage}</span>
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={state === "submitting"}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-500 text-black text-sm font-display uppercase tracking-widest",
                  "hover:bg-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                )}
              >
                {state === "submitting"
                  ? myReview
                    ? "Modification..."
                    : "Publication..."
                  : myReview
                    ? "Mettre à jour"
                    : "Publier mon avis"}
              </button>

              {myReview && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={state === "submitting"}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-60"
                >
                  Supprimer
                </button>
              )}
            </div>
          </form>
        ) : !isSignedIn ? (
          // Default (SSR + anonymous): sign-in CTA. Renders on the server so
          // anonymous visitors see it before hydration; the form replaces it
          // once Clerk confirms a signed-in session on the client.
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mx-auto">
              <QuoteMark className="w-7 h-7 text-yellow-500" />
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Connectez-vous pour laisser un avis
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Votre avis aide les autres clients à faire le bon choix. La
              publication nécessite un compte IRONZ.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-500 text-black text-sm font-display uppercase tracking-widest hover:bg-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                >
                  Se connecter
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-display uppercase tracking-widest hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                >
                  S'inscrire
                </button>
              </SignUpButton>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ── Review card ────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: ReviewRecord }) {
  const isOwner = Boolean((review as ReviewRecord & { isOwner?: boolean }).isOwner);
  const name = review.username || "Client IRONZ";
  const initials = name.trim().charAt(0).toUpperCase() || "?";
  const stars = Math.round(Number(review.rating) || 0);

  return (
    <div className="p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >{initials}</div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{name}</p>
              {isOwner && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Votre avis
                </span>
              )}
            </div>
            <div
              className="flex gap-0.5 mt-0.5"
              role="img"
              aria-label={`${stars} étoile${stars > 1 ? "s" : ""}`}
            >
              {[...Array(5)].map((_, i) =>
                i < stars ? (
                  <StarSolid key={i} className="w-3 h-3 text-yellow-400" />
                ) : (
                  <StarOutline key={i} className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                ),
              )}
            </div>
          </div>
        </div>
        <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
          {formatReviewDate(review.createdAt || review.date)}
        </span>
      </div>

      {review.title ? (
        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
          {review.title}
        </p>
      ) : null}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
        {review.body}
      </p>
    </div>
  );
}
