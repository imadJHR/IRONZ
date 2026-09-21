"use client";

/**
 * Accessible 1–5 star rating selector.
 *
 * Uses native HTML `role="radiogroup"` semantics so arrow-key support,
 * focus management and screen-reader labels come from the platform.
 * Rendered as SVG stars (lucide `Star`), not emoji.
 */

import { useId } from "react";
import { StarSolid, StarOutline } from "../../components/reviews/icons";

interface StarInputProps {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
  /** Optional label rendered above the group. */
  label?: string;
  id?: string;
}

const STAR_LABELS: Record<number, string> = {
  1: "1 étoile",
  2: "2 étoiles",
  3: "3 étoiles",
  4: "4 étoiles",
  5: "5 étoiles",
};

export function StarInput({
  value,
  onChange,
  disabled = false,
  label,
  id,
}: StarInputProps) {
  // `useId` must run unconditionally (rules-of-hooks); `id` wins when given.
  const generatedId = useId();
  const groupId = id || generatedId;

  return (
    <div className="space-y-1.5">
      {label && (
        <span
          id={`${groupId}-label`}
          className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
        >
          {label}
        </span>
      )}
      <div
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-required="true"
        className="flex items-center gap-1.5"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= value;
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star === value}
              aria-label={STAR_LABELS[star]}
              disabled={disabled}
              onClick={() => onChange(star)}
              className={cn(
                "p-1 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
                disabled && "cursor-not-allowed opacity-60",
                !disabled && "hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
              )}
            >
              <StarSolid
                className={cn(
                  "w-6 h-6 transition-colors",
                  active
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600",
                )}
              />
              <span className="sr-only">{STAR_LABELS[star]}</span>
            </button>
          );
        })}
        <span
          className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 select-none"
          aria-hidden="true"
        >
          {value > 0 ? `${value}/5` : ""}
        </span>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
