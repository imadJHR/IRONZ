import type { SVGProps } from "react";

// Small, native SVG set for the pack controls and delivery information.
export function PackIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: "delivery" | "check" | "plus" | "minus" }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
    {name === "delivery" && <><path d="M3 5.5h10v12H3zM13 9h4.5l3.5 4v4.5h-8" /><path d="M17.5 9v4H21" /><circle cx="6.5" cy="18" r="2" fill="currentColor" stroke="none" /><circle cx="17.5" cy="18" r="2" fill="currentColor" stroke="none" /></>}
    {name === "check" && <path d="m5 12 4 4 10-10" />}
    {name === "plus" && <path d="M5 12h14M12 5v14" />}
    {name === "minus" && <path d="M5 12h14" />}
  </svg>;
}
