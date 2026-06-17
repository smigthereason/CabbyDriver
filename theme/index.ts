// ─── Cabby Driver — Design Tokens ─────────────────────────────────────────
// Palette: clean off-white surfaces, true black primaries, warm mid-grays
// Typography: system fonts with deliberate weight contrasts
// Radius: pill CTAs, card corners, tight inputs

export const Colors = {
  // Core
  black: "#0A0A0A",
  white: "#FFFFFF",
  offWhite: "#F4F4F2",
  surface: "#FFFFFF",

  // Grays
  gray50: "#F9F9F9",
  gray100: "#F4F4F2",
  gray200: "#E8E8E6",
  gray300: "#D1D1CE",
  gray400: "#A8A8A5",
  gray500: "#6E6E6B",
  gray600: "#4A4A47",
  gray700: "#2E2E2B",

  // Brand accent (used sparingly)
  accent: "#0A0A0A", // stays monochrome — the brand identity IS the black/white contrast

  // Semantic
  error: "#D93025",
  success: "#1A7A4A",
  warning: "#E67E22",

  // Input
  inputBorder: "#E0E0DD",
  inputFill: "#FFFFFF",
  placeholder: "#A8A8A5",

  // Card / Subscription selected
  selectedCard: "#0A0A0A",
  selectedCardText: "#FFFFFF",
  unselectedCard: "#FFFFFF",
} as const;

export const Typography = {
  // Display — heavy, impactful headers
  displayLarge: {
    fontSize: 32,
    fontWeight: "800" as const,
    letterSpacing: -0.8,
    lineHeight: 38,
    color: Colors.black,
  },
  displayMedium: {
    fontSize: 26,
    fontWeight: "700" as const,
    letterSpacing: -0.5,
    lineHeight: 32,
    color: Colors.black,
  },
  displaySmall: {
    fontSize: 22,
    fontWeight: "700" as const,
    letterSpacing: -0.3,
    lineHeight: 28,
    color: Colors.black,
  },

  // Body
  bodyLarge: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
    color: Colors.black,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
    color: Colors.gray500,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
    color: Colors.gray400,
  },

  // Label
  labelLarge: {
    fontSize: 15,
    fontWeight: "600" as const,
    letterSpacing: 0.1,
    color: Colors.black,
  },
  labelMedium: {
    fontSize: 13,
    fontWeight: "600" as const,
    letterSpacing: 0.2,
    color: Colors.black,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: "500" as const,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
    color: Colors.gray500,
  },

  // Caption
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
    color: Colors.gray400,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 100,
} as const;

export const Shadow = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  subtle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
} as const;
