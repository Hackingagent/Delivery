export const COLORS = {
  // Brand Colors
  primary: "#F26C22",
  primaryLight: "#FF8F4D",
  primaryDark: "#D4571A",

  // Secondary / Accent
  secondary: "#1C1C1E",
  success: "#00B578",
  error: "#FF3B30",
  warning: "#FFCC00",

  // Backgrounds & Surfaces
  background: "#F7F8FA",
  surface: "#FFFFFF",

  // Text Colors
  text: "#1C1C1E",
  textLight: "#8E8E93",
  textMuted: "#C7C7CC",
  textInverse: "#FFFFFF",

  // Borders & Dividers
  border: "#E5E5EA",
  borderLight: "#F2F2F7",

  // Shadows
  shadow: "rgba(28, 28, 30, 0.08)",
};

export const SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  spacing: 16,
  spacingSm: 8,
  spacingLg: 24,
  spacingXl: 32,

  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusPill: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const THEME = {
  colors: COLORS,
  sizes: SIZES,
  shadows: SHADOWS,
};
