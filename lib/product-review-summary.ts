type ReviewSource = { reviews?: ReadonlyArray<{ rating: number }> };

/** Detailed records are the source of public ratings, never legacy counters.
 * Verification and purchase status do not determine a review's numeric rating.
 * This does not establish authenticity or repair product associations.
 */
export function productReviewSummary(product: ReviewSource): {
  count: number;
  average: number | undefined;
} {
  const rows = Array.isArray(product.reviews) ? product.reviews : [];
  const ratings = rows.map((review) => Number(review?.rating));
  const valid = ratings.length > 0 && ratings.every((rating) =>
    Number.isFinite(rating) && rating >= 1 && rating <= 5,
  );
  return {
    count: rows.length,
    average: valid
      ? Number((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1))
      : undefined,
  };
}

export function productAggregateRatingSchema(product: ReviewSource) {
  const summary = productReviewSummary(product);
  return summary.average === undefined ? {} : {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.average,
      reviewCount: summary.count,
    },
  };
}
