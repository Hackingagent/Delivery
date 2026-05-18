import { THEME } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 60 : 30,
    paddingBottom: THEME.sizes.spacingLg,
    paddingHorizontal: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
  },
  backButton: {
    padding: THEME.sizes.spacingSm,
  },
  headerTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
  },
  amountContainer: {
    alignItems: "center",
    marginVertical: THEME.sizes.spacingLg,
  },
  amountLabel: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
    marginBottom: THEME.sizes.spacingSm,
  },
  amountValue: {
    fontSize: 40,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  sectionTitle: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingLg,
    marginTop: THEME.sizes.spacingSm,
  },
  methodsList: {
    gap: THEME.sizes.spacing,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacing,
    borderRadius: THEME.sizes.radiusLg,
    borderWidth: 1.5,
    borderColor: THEME.colors.borderLight,
    ...THEME.shadows.small,
  },
  methodCardSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: "#FFF5F0", // Very light primary tint
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: THEME.sizes.radiusMd,
    backgroundColor: THEME.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacing,
  },
  iconContainerSelected: {
    backgroundColor: THEME.colors.surface,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
    marginBottom: 2,
  },
  methodSubtitle: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
  },
  radioOutline: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: THEME.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.colors.primary,
  },
  footer: {
    padding: THEME.sizes.spacingLg,
    paddingBottom: Platform.OS === "ios" ? 40 : THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
});
