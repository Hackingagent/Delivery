import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingVertical: THEME.sizes.spacingLg,
  },
  backBtn: {
    padding: THEME.sizes.spacingSm,
    marginLeft: -THEME.sizes.spacingSm,
  },
  addIconBtn: {
    padding: THEME.sizes.spacingSm,
    marginRight: -THEME.sizes.spacingSm,
  },
  headerTitle: {
    fontSize: THEME.sizes.xl,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
    paddingBottom: 100,
  },
  addLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusXl,
    marginBottom: THEME.sizes.spacingXl,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: THEME.colors.primary + "50",
  },
  addIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacingLg,
    ...THEME.shadows.small,
  },
  addLocationText: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.primary,
  },
  sectionTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "600",
    color: THEME.colors.textLight,
    marginBottom: THEME.sizes.spacingLg,
    marginLeft: THEME.sizes.spacingSm,
  },
  addressesList: {
    gap: THEME.sizes.spacingMd,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    ...THEME.shadows.small,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacingLg,
  },
  addressInfo: {
    flex: 1,
    marginRight: THEME.sizes.spacingMd,
  },
  addressType: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  addressText: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    lineHeight: 20,
  },
  infoBox: {
    marginTop: THEME.sizes.spacingXl,
    padding: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusMd,
    alignItems: "center",
  },
  infoText: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    textAlign: "center",
    fontStyle: "italic",
  },
});
