"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

// Facebook Pixel ID
export const FB_PIXEL_ID = "2235692166803820";

// Standard Facebook Pixel event names (type-safe)
export type FBStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "AddToWishlist"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "CustomizeProduct"
  | "Donate"
  | "FindLocation"
  | "Schedule"
  | "StartTrial"
  | "SubmitApplication"
  | "Subscribe";

// Common event parameter types
export interface FBEventParams {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product" | "product_group";
  contents?: Array<{ id: string; quantity: number }>;
  currency?: string;
  value?: number;
  num_items?: number;
  search_string?: string;
  status?: string;
  predicted_ltv?: number;
  [key: string]: unknown;
}

// Extend Window interface for fbq
declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom" | "init" | string,
      eventName?: FBStandardEvent | string,
      params?: FBEventParams
    ) => void;
    _fbq?: unknown;
  }
}

// Helper to check if fbq is loaded
const isFbqReady = (): boolean =>
  typeof window !== "undefined" && typeof window.fbq === "function";

export default function FacebookPixel(){
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track PageView on route changes (SPA navigation)
  useEffect(() => {
    // The initial PageView is fired by the inline script below.
    // This effect handles subsequent client-side navigations.
    if (isFbqReady()) {
      window.fbq?.("track", "PageView");
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Facebook Pixel Base Code */}
      <Script
        id="fb-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* Fallback for users without JavaScript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
          aria-hidden="true"
        />
      </noscript>
    </>
  );
}

/**
 * Track a standard Facebook Pixel event
 * @param eventName - Standard Facebook event name (type-safe)
 * @param params - Optional event parameters
 */
export function trackFBEvent(
  eventName: FBStandardEvent,
  params: FBEventParams = {}
): void {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    // Validation for Purchase events
    if (eventName === "Purchase") {
      if (typeof params.value !== "number" || params.value <= 0) {
        console.warn(
          "Facebook Pixel: 'Purchase' event requires a positive numeric 'value' parameter."
        );
      }
      if (!params.currency || typeof params.currency !== "string") {
        console.warn(
          "Facebook Pixel: 'Purchase' event requires a 'currency' parameter (e.g., 'USD', 'EUR', 'MAD')."
        );
      }
    }
    window.fbq("track", eventName, params);
  } else {
    console.warn(
      `Facebook Pixel: fbq not yet initialized. Event "${eventName}" was not tracked.`
    );
  }
}

/**
 * Track a custom Facebook Pixel event
 * @param eventName - Custom event name (must follow Facebook naming conventions)
 * @param params - Optional event parameters
 */
export function trackFBCustomEvent(
  eventName: string,
  params: FBEventParams = {}
): void {
  if (typeof window === "undefined") return;

  // Validate custom event name (Facebook recommends uppercase with underscores)
  if (!/^[A-Z][A-Z0-9_]*$/.test(eventName)) {
    console.warn(
      `Facebook Pixel: Custom event name "${eventName}" should be uppercase with underscores (e.g., "CUSTOM_EVENT").`
    );
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  } else {
    console.warn(
      `Facebook Pixel: fbq not yet initialized. Custom event "${eventName}" was not tracked.`
    );
  }
}

/**
 * Utility: Track AddToCart event with product details
 */
export function trackAddToCart(
  productId: string,
  productName: string,
  price: number,
  currency = "MAD",
  quantity = 1
): void {
  trackFBEvent("AddToCart", {
    content_ids: [productId],
    content_name: productName,
    content_type: "product",
    value: price * quantity,
    currency,
    num_items: quantity,
  });
}

/**
 * Utility: Track Purchase event with order details
 */
export function trackPurchase(
  orderId: string,
  total: number,
  currency = "MAD",
  items: Array<{ id: string; name: string; price: number; quantity: number }> = []
): void {
  trackFBEvent("Purchase", {
    content_ids: items.map((item) => item.id),
    contents: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
    value: total,
    currency,
    num_items: items.reduce((sum, item) => sum + item.quantity, 0),
    order_id: orderId,
  });
}

/**
 * Utility: Track ViewContent event for product pages
 */
export function trackViewContent(
  productId: string,
  productName: string,
  price: number,
  currency = "MAD",
  category?: string
): void {
  trackFBEvent("ViewContent", {
    content_ids: [productId],
    content_name: productName,
    content_type: "product",
    value: price,
    currency,
    ...(category && { content_category: category }),
  });
}