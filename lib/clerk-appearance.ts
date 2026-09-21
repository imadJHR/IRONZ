/**
 * Clerk appearance matching the IRONZ visual identity.
 *
 * Brand palette (see app/globals.css and components):
 *  - yellow: #FFDE00 (primary CTAs, active stars)
 *  - black:  #0A0A0A (text, dark surfaces)
 *  - white:  #FFFFFF (card backgrounds)
 *
 * Installed SDK is `@clerk/nextjs` v6. The appearance schema used here is
 * verified against the installed `Variables` / `Layout` types
 * (`@clerk/shared/dist/types/index.d.ts`), where `options` is `layout`.
 */

import type { Appearance, LocalizationResource } from "@clerk/types";

const BRAND_YELLOW = "#FFDE00";
const BRAND_BLACK = "#0A0A0A";
const BRAND_WHITE = "#FFFFFF";
const BRAND_BORDER = "#E5E7EB";
const BRAND_MUTED = "#6B7280";
const BRAND_RING = "rgba(255, 222, 0, 0.28)";

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: BRAND_YELLOW,
    colorPrimaryForeground: BRAND_BLACK,
    colorBackground: BRAND_WHITE,
    colorForeground: BRAND_BLACK,
    colorText: BRAND_BLACK,
    colorMuted: "#F4F4F5",
    colorMutedForeground: BRAND_MUTED,
    colorTextSecondary: BRAND_MUTED,
    colorInput: BRAND_WHITE,
    colorInputForeground: BRAND_BLACK,
    colorBorder: BRAND_BORDER,
    colorRing: BRAND_RING,
    colorShadow: "rgba(10, 10, 10, 0.16)",
    colorDanger: "#DC2626",
    colorSuccess: "#16A34A",
    colorWarning: "#D97706",
    colorNeutral: BRAND_BLACK,
    colorModalBackdrop: "rgba(10, 10, 10, 0.62)",
    borderRadius: "0.875rem",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    fontFamilyButtons:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    fontWeight: { medium: "500", semibold: "600", bold: "700" },
    fontSize: {
      lg: "1.125rem",
      md: "1rem",
      sm: "0.875rem",
      xs: "0.75rem",
    },
    spacingUnit: "0.25rem",
  },
  layout: {
    logoImageUrl: "/logo-optimized.png",
    logoLinkUrl: "/",
    logoPlacement: "inside",
    socialButtonsVariant: "blockButton",
    socialButtonsPlacement: "bottom",
    showOptionalFields: false,
    animations: true,
    shimmer: false,
    privacyPageUrl: "/confidentialite",
    termsPageUrl: "/conditions",
    helpPageUrl: "/contact",
  },
  elements: {
    // Keep the modal compact on desktop while giving mobile a safe gutter.
    modalBackdrop: {
      backgroundColor: "rgba(10, 10, 10, 0.62)",
      backdropFilter: "blur(3px)",
    },
    modalContent: {
      width: "min(100% - 2rem, 26.875rem)",
      maxHeight: "calc(100vh - 2rem)",
      overflowY: "auto",
      overscrollBehavior: "contain",
      borderRadius: "0.875rem",
    },
    modalCloseButton: {
      color: BRAND_MUTED,
      borderRadius: "0.5rem",
      "&:hover": {
        color: BRAND_BLACK,
        backgroundColor: "#F4F4F5",
      },
    },
    rootBox: {
      color: BRAND_BLACK,
    },
    // Clerk renders the form card and footer as siblings inside cardBox.
    // One shared shell keeps both sections visually unified.
    cardBox: {
      width: "100%",
      maxWidth: "100%",
      padding: "0",
      overflow: "hidden",
      borderRadius: "0.875rem",
      backgroundColor: BRAND_WHITE,
      border: `1px solid ${BRAND_BORDER}`,
      boxShadow: "0 18px 42px -22px rgba(10, 10, 10, 0.3)",
    },
    card: {
      borderRadius: "0",
      backgroundColor: BRAND_WHITE,
      boxShadow: "none",
      border: "none",
      padding: "1.5rem 1.5rem 1rem",
    },
    // Small brand mark: identification without a second visual panel.
    logoBox: {
      height: "3rem",
      width: "4.5rem",
      minHeight: "3rem",
      padding: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      overflow: "hidden",
      backgroundColor: "transparent",
      borderBottom: `2px solid ${BRAND_YELLOW}`,
    },
    logoImage: {
      width: "4.5rem",
      height: "auto",
      maxHeight: "none",
      flexShrink: "0",
      objectFit: "contain",
    },
    header: {
      gap: "0.625rem",
      textAlign: "center",
    },
    // Authentication uses the site's readable commerce UI typography.
    headerTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      letterSpacing: "-0.015em",
      textTransform: "none",
      color: BRAND_BLACK,
    },
    headerSubtitle: {
      color: BRAND_MUTED,
      fontSize: "0.875rem",
    },
    socialButtonsBlockButton: {
      minHeight: "2.75rem",
      width: "100%",
      minWidth: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      backgroundColor: BRAND_WHITE,
      borderRadius: "0.625rem",
      borderColor: BRAND_BORDER,
      color: BRAND_BLACK,
      fontSize: "0.875rem",
      fontWeight: "600",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#F9FAFB",
        borderColor: "#9CA3AF",
      },
    },
    socialButtonsBlockButtonText: {
      color: BRAND_BLACK,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
      fontWeight: "500",
    },
    socialButtonsProviderIcon: {
      width: "1.125rem",
      height: "1.125rem",
      minWidth: "1.125rem",
      flexShrink: "0",
      display: "block",
      objectFit: "contain",
    },
    socialButtonsProviderInitialIcon: {
      width: "1.125rem",
      height: "1.125rem",
      minWidth: "1.125rem",
      flexShrink: "0",
    },
    socialButtonsRoot: {
      gap: "0.625rem",
      width: "100%",
    },
    socialButtons: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "0.5rem",
      width: "100%",
      "@media (max-width: 400px)": {
        gridTemplateColumns: "1fr",
      },
    },
    dividerLine: {
      background: BRAND_BORDER,
    },
    dividerText: {
      color: BRAND_MUTED,
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      fontWeight: "500",
    },
    // Inputs — neutral with a yellow focus ring.
    formFieldLabel: {
      color: BRAND_BLACK,
      fontSize: "0.8125rem",
      fontWeight: "500",
    },
    formFieldAction: {
      color: "#374151",
      fontSize: "0.8125rem",
      fontWeight: "500",
      "&:hover, &:focus": {
        color: BRAND_BLACK,
        textDecoration: "underline",
        textDecorationColor: BRAND_YELLOW,
        textUnderlineOffset: "0.2em",
      },
    },
    formFieldInput: {
      minHeight: "2.75rem",
      width: "100%",
      backgroundColor: BRAND_WHITE,
      borderRadius: "0.625rem",
      borderColor: BRAND_BORDER,
      color: BRAND_BLACK,
      fontSize: "0.9375rem",
      "&:focus": {
        borderColor: BRAND_YELLOW,
        boxShadow: `0 0 0 3px ${BRAND_RING}`,
      },
      "&:hover": {
        borderColor: "#9CA3AF",
      },
      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
        WebkitTextFillColor: BRAND_BLACK,
        WebkitBoxShadow: `0 0 0 1000px ${BRAND_WHITE} inset`,
        caretColor: BRAND_BLACK,
      },
    },
    formFieldErrorText: {
      color: "#B91C1C",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    formFieldHintText: {
      color: BRAND_MUTED,
      fontSize: "0.75rem",
    },
    formFieldSuccessText: {
      color: "#4B5563",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    formFieldWarningText: {
      color: "#B45309",
      fontSize: "0.75rem",
    },
    formFieldInputShowPasswordButton: {
      color: BRAND_MUTED,
      borderRadius: "0.375rem",
      "&:hover": {
        color: BRAND_BLACK,
        backgroundColor: "#F4F4F5",
      },
    },
    identityPreviewText: {
      color: BRAND_BLACK,
      fontSize: "0.875rem",
    },
    formButtonPrimary: {
      minHeight: "2.75rem",
      width: "100%",
      backgroundColor: BRAND_YELLOW,
      color: BRAND_BLACK,
      borderRadius: "0.625rem",
      fontWeight: "600",
      fontSize: "0.9375rem",
      letterSpacing: "0",
      "&:hover, &:focus, &:active": {
        backgroundColor: "#FFD400",
        color: BRAND_BLACK,
      },
      "&:active": {
        transform: "translateY(1px)",
      },
    },
    formButtonPrimary__loading: {
      backgroundColor: "#FFD400",
      color: BRAND_BLACK,
    },
    otpCodeFieldInput: {
      width: "2.75rem",
      height: "2.875rem",
      borderRadius: "0.625rem",
      borderColor: BRAND_BORDER,
      color: BRAND_BLACK,
      fontWeight: "700",
      "&:focus": {
        borderColor: BRAND_YELLOW,
        boxShadow: `0 0 0 3px ${BRAND_RING}`,
      },
    },
    formButtonReset: {
      borderRadius: "0.625rem",
      fontWeight: "600",
      fontSize: "0.875rem",
      color: BRAND_BLACK,
      backgroundColor: BRAND_WHITE,
      border: `1px solid ${BRAND_BORDER}`,
    },
    footer: {
      backgroundColor: BRAND_WHITE,
      borderTop: `1px solid ${BRAND_BORDER}`,
      padding: "0.75rem 1.5rem 1rem",
      gap: "0.375rem",
    },
    footerItem: {
      color: BRAND_MUTED,
      fontSize: "0.75rem",
    },
    footerAction: {
      paddingTop: "0.25rem",
      paddingBottom: "0.25rem",
    },
    footerActionLink: {
      color: BRAND_BLACK,
      fontWeight: "600",
      fontSize: "0.875rem",
      "&:hover": {
        color: BRAND_BLACK,
        textDecoration: "underline",
        textDecorationColor: BRAND_YELLOW,
        textUnderlineOffset: "0.2em",
      },
    },
    footerActionText: {
      color: BRAND_MUTED,
      fontSize: "0.875rem",
    },
    footerPagesLink: {
      color: BRAND_MUTED,
      fontSize: "0.75rem",
      "&:hover": {
        color: BRAND_BLACK,
      },
    },
    alertText: {
      color: BRAND_BLACK,
      fontSize: "0.875rem",
    },

    // UserButton popover.
    userButtonPopoverCard: {
      borderRadius: "0.875rem",
      border: `1px solid ${BRAND_BORDER}`,
      boxShadow: "0 16px 36px -20px rgba(10, 10, 10, 0.3)",
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    },
    userButtonPopoverMain: {
      background: BRAND_WHITE,
    },
    userButtonPopoverFooter: {
      background: BRAND_WHITE,
    },
    userPreviewMainIdentifier: {
      color: BRAND_BLACK,
      fontWeight: "600",
    },
    userPreviewSecondaryIdentifier: {
      color: BRAND_MUTED,
    },
    userButtonPopoverActionButton: {
      borderRadius: "0.625rem",
      color: BRAND_BLACK,
      fontSize: "0.875rem",
      "&:hover": {
        backgroundColor: "#F9FAFB",
      },
    },
    userButtonPopoverFooterPagesLink: {
      color: BRAND_MUTED,
      "&:hover": {
        color: BRAND_BLACK,
      },
    },
    // MFA / strategy pages share the card styling above.
    main: {
      gap: "1rem",
    },
  },
};

/**
 * Focused French copy for the user-facing auth card. Clerk merges this partial
 * resource with its built-in strings, keeping validation and security copy
 * managed by Clerk while the primary journey matches the IRONZ storefront.
 */
export const clerkLocalization: LocalizationResource = {
  locale: "fr-FR",
  dividerText: "ou",
  formFieldAction__forgotPassword: "Mot de passe oublié ?",
  formButtonPrimary: "Continuer",
  signIn: {
    start: {
      title: "Connexion",
      titleCombined: "Connexion",
      subtitle: "Accédez à votre compte IRONZ.",
      subtitleCombined: "Accédez à votre compte IRONZ.",
      actionText: "Pas encore de compte ?",
      actionLink: "S’inscrire",
    },
  },
  signUp: {
    start: {
      title: "Créer un compte",
      titleCombined: "Créer un compte",
      subtitle: "Créez votre compte IRONZ en quelques instants.",
      subtitleCombined: "Créez votre compte IRONZ en quelques instants.",
      actionText: "Vous avez déjà un compte ?",
      actionLink: "Se connecter",
    },
  },
};

/**
 * Narrow appearance for the header UserButton avatar.
 * The full `clerkAppearance` is applied at the provider level, so this
 * only overrides the avatar size to match the header icon row.
 */
export const userButtonAppearance: Appearance = {
  elements: {
    userButtonAvatarBox: {
      height: "2.25rem",
      width: "2.25rem",
    },
  },
};
