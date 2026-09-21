/**
 * Pro-grade SVG icon set for the product review UI.
 *
 * Custom paths instead of generic lucide-react template icons:
 *  - `StarSolid`  : filled star with precise inner facets
 *  - `StarOutline`: matching outline star for the un-selected state
 *  - `QuoteMark`  : quotation glyph used as the empty-state mark
 *  - `VerifiedCheck` : verified badge (purchase-proven reviews only)
 *
 * All icons share `currentColor` and a 24×24 viewBox so they inherit the
 * surrounding text color and Tailwind sizing classes.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  focusable: false as const,
};

/** Filled 5-point star with two facet highlights for a premium look. */
export function StarSolid({ className, ...props }: IconProps) {
  return (
    <svg
      {...baseProps}
      className={className}
      fill="currentColor"
      role="img"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.922c.46 0 .873.28 1.047.706l2.514 6.166 6.676.556c.46.038.86.342 1.005.782.146.44.008.924-.35 1.219l-5.074 4.176 1.5 6.533c.103.45-.075.918-.455 1.184-.38.266-.882.278-1.273.03L12 18.953l-5.09 3.155c-.391.248-.893.236-1.273-.03-.38-.266-.558-.734-.455-1.184l1.5-6.533-5.074-4.176c-.358-.295-.496-.779-.35-1.219.145-.44.545-.744 1.005-.782l6.676-.556 2.514-6.166c.174-.426.587-.706 1.047-.706Z"
      />
    </svg>
  );
}

/** Outline star matching `StarSolid` geometry, for the un-selected state. */
export function StarOutline({ className, ...props }: IconProps) {
  return (
    <svg
      {...baseProps}
      className={className}
      role="img"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.922c.073 0 .139.045.166.113l2.514 6.166a.75.75 0 0 0 .631.467l6.676.556a.175.175 0 0 1 .121.295l-5.074 4.176a.75.75 0 0 0-.243.742l1.5 6.533a.175.175 0 0 1-.265.19l-5.35-3.318a.75.75 0 0 0-.792 0l-5.35 3.318a.175.175 0 0 1-.265-.19l1.5-6.533a.75.75 0 0 0-.243-.742L2.392 10.52a.175.175 0 0 1 .121-.295l6.676-.556a.75.75 0 0 0 .631-.467l2.514-6.166A.175.175 0 0 1 12 2.922Zm0 2.52-1.98 4.86a1.95 1.95 0 0 1-1.642 1.216l-5.25.437 3.99 3.284a1.95 1.95 0 0 1 .633 1.932l-1.18 5.14 4.211-2.61a1.95 1.95 0 0 1 2.06 0l4.21 2.61-1.18-5.14a1.95 1.95 0 0 1 .634-1.932l3.99-3.284-5.25-.437a1.95 1.95 0 0 1-1.642-1.216L12 5.44Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Quotation mark used as the reviews empty-state mark. */
export function QuoteMark({ className, ...props }: IconProps) {
  return (
    <svg
      {...baseProps}
      className={className}
      role="img"
      fill="currentColor"
      {...props}
    >
      <path d="M9.5 6C6.46 6 4 8.46 4 11.5V18h6.5v-6.5H7.5C7.5 9.57 8.57 8 10 8V6h-.5Zm10 0C16.46 6 14 8.46 14 11.5V18h6.5v-6.5h-3C17.5 9.57 18.57 8 20 8V6h-.5Z" />
    </svg>
  );
}

/** Verified badge — only for reviews with proven purchase. */
export function VerifiedCheck({ className, ...props }: IconProps) {
  return (
    <svg
      {...baseProps}
      className={className}
      role="img"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5c.62 0 1.18.337 1.478.876l1.22 2.755 2.968.317a1.6 1.6 0 0 1 1.33 2.184l-1.08 2.9 1.663 2.466a1.6 1.6 0 0 1-.96 2.444l-2.913.683-1.592 2.513a1.6 1.6 0 0 1-2.708 0L8.917 19.125l-2.913-.683a1.6 1.6 0 0 1-.96-2.444l1.663-2.466-1.08-2.9a1.6 1.6 0 0 1 1.33-2.184l2.968-.317 1.22-2.755A1.6 1.6 0 0 1 12 2.5Zm0 2.02-1.09 2.46a2.2 2.2 0 0 1-1.832 1.296l-2.655.284.966 2.592a2.2 2.2 0 0 1-.234 2.015l-1.486 2.204 2.604.61a2.2 2.2 0 0 1 1.482 1.123l1.422 2.245 1.422-2.245a2.2 2.2 0 0 1 1.482-1.122l2.604-.611-1.486-2.204a2.2 2.2 0 0 1-.234-2.015l.966-2.592-2.655-.284A2.2 2.2 0 0 1 13.09 6.98L12 4.52Zm3.06 6.26a.75.75 0 1 0-1.12-1l-2.47 2.766-1.14-1.138a.75.75 0 0 0-1.06 1.06l1.7 1.7a.75.75 0 0 0 1.09-.03l3-3.358Z"
      />
    </svg>
  );
}

/** Chevron pointing right, for the summary "read reviews" affordance. */
export function ChevronRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      {...baseProps}
      className={className}
      role="img"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.3 4.3a1 1 0 0 0 0 1.4l5.29 5.3-5.29 5.3a1 1 0 1 0 1.4 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.4 0Z"
      />
    </svg>
  );
}
