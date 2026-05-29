import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: THEME.sizes.radiusLg,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: THEME.sizes.spacingLg,
    gap: THEME.sizes.spacingSm,
  },
  primaryContainer: {
    backgroundColor: THEME.colors.primary,
    ...THEME.shadows.medium,
  },
  secondaryContainer: {
    backgroundColor: THEME.colors.secondary,
  },
  outlineContainer: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  textModeContainer: {
    backgroundColor: "transparent",
    height: "auto",
    paddingHorizontal: 0,
  },
  disabledContainer: {
    backgroundColor: THEME.colors.textMuted,
    borderColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  primaryText: {
    color: THEME.colors.textInverse,
  },
  secondaryText: {
    color: THEME.colors.textInverse,
  },
  outlineText: {
    color: THEME.colors.primary,
  },
  textModeText: {
    color: THEME.colors.primary,
  },
  disabledText: {
    color: THEME.colors.surface,
  },
});
