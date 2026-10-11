/**
 * Custom pro SVG icon set for the blog (template style).
 * Stroke-based, 24x24, currentColor — no external dependency.
 */

interface IconProps {
  className?: string;
}

function Base({
  className = "h-4 w-4",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function DumbbellIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />
    </Base>
  );
}

export function CardioIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 20.5C7 16.5 3.5 13.4 3.5 9.9c0-2.5 1.9-4.2 4.1-4.2 1.7 0 3.2.9 4.4 2.4 1.2-1.5 2.7-2.4 4.4-2.4 2.2 0 4.1 1.7 4.1 4.2 0 3.5-3.5 6.6-8.5 10.6z" />
      <path d="M6.5 12h3l1.5-3 2 5 1.5-2H18" />
    </Base>
  );
}

export function NutritionIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 8.5c-3.5-2.5-8-.5-8 4 0 3.5 2.5 8 4.5 8 1 0 1.5-.5 3.5-.5s2.5.5 3.5.5c2 0 4.5-4.5 4.5-8 0-4.5-4.5-6.5-8-4z" />
      <path d="M12 8.5c0-2.5 1-4.5 3-5.5" />
    </Base>
  );
}

export function HomeGymIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M4 11.5 12 4.5l8 7V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />
      <path d="M9.5 20v-6h5v6" />
    </Base>
  );
}

export function PlanIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M3.5 16.5 16.5 3.5l4 4L7.5 20.5z" />
      <path d="M8 15.5l1.5 1.5M11 12.5l1.5 1.5M14 9.5l1.5 1.5" />
    </Base>
  );
}

export function ServicesIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M9 8V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V8M4 13h16" />
    </Base>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Base>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M4 10.5h16M8.5 3.5V7M15.5 3.5V7" />
    </Base>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
    </Base>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </Base>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M9.5 6 15.5 12l-6 6" />
    </Base>
  );
}
