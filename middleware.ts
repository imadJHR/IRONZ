import { clerkMiddleware } from '@clerk/nextjs/server';

/**
 * Clerk middleware is mounted ONLY on the routes that actually consume the
 * Clerk session: the API route handlers that call `auth()` (reviews).
 *
 * Every public page (/, /produit, /categories/*, /services/*, /guides/*,
 * /contact, /a-propos, /faq, /conditions, /confidentialite, /demande-devis,
 * /panier, /checkout) is server-rendered without any call to `auth()`, so
 * Clerk's middleware has nothing to do on them.
 *
 * This is also what makes the site indexable. `clerkMiddleware` runs
 * `authenticateRequest` before it evaluates any handler logic, and on a Clerk
 * **development** instance that call returns a dev-browser handshake
 * `Location` header which `clerkMiddleware` turns into a 307 to
 * `https://<instance>.clerk.accounts.dev/v1/client/handshake`. The handshake
 * response carries `X-Robots-Tag: noindex, nofollow`, which removes every
 * public page from Google's index (BLOCKED_BY_HTTP_HEADER). Narrowing the
 * matcher to /api is the source-side fix; /robots.txt and /sitemap.xml are
 * therefore never touched by Clerk either.
 *
 * /ironz-setup is not Clerk-protected: it uses its own client-side password
 * gate (localStorage), so it stays matched and reachable like any other page.
 */
export default clerkMiddleware();

export const config = {
  matcher: ['/api/(.*)'],
};
