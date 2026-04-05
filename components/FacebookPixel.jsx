"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export const FB_PIXEL_ID = "2235692166803820";

// Helper to check if fbq is loaded
const isFbqReady = () => typeof window !== "undefined" && typeof window.fbq === "function";

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track PageView on route changes (SPA navigation)
  useEffect(() => {
    // The initial PageView is fired by the inline script below.
    // This effect handles subsequent client-side navigations.
    if (isFbqReady()) {
      window.fbq("track", "PageView");
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
        />
      </noscript>
    </>
  );
}

// Export helper for tracking custom events from other components
export function trackFBEvent(eventName, params = {}) {
  if (typeof window !== "undefined") {
    // fbq already handles queuing if correctly initialized via the base code
    if (typeof window.fbq === "function") {
      // Small verification for Purchase events
      if (eventName === "Purchase" && (!params.value || !params.currency)) {
        console.warn("Facebook Pixel: 'Purchase' event requires 'value' and 'currency' parameters.");
      }
      window.fbq("track", eventName, params);
    } else {
      console.warn(`Facebook Pixel: fbq not yet available for event: ${eventName}`);
    }
  }
}

export function trackFBCustomEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}
