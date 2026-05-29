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
  shareBtn: {
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
  },
  receiptCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusXl,
    overflow: "hidden",
    ...THEME.shadows.medium,
  },
  successHeader: {
    alignItems: "center",
    padding: THEME.sizes.spacingXl,
    paddingTop: THEME.sizes.spacingXl * 1.5,
  },
  successTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "600",
    color: THEME.colors.textLight,
    marginTop: THEME.sizes.spacingLg,
    marginBottom: THEME.sizes.spacingSm,
  },
  successAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  dashLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    overflow: "hidden",
    position: "relative",
  },
  circleCutoutLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.background,
    position: "absolute",
    left: -20,
    zIndex: 1,
  },
  dashLine: {
    flex: 1,
    height: 2,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderStyle: "dashed",
    marginHorizontal: 16,
  },
  circleCutoutRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.background,
    position: "absolute",
    right: -20,
    zIndex: 1,
  },
  detailsBody: {
    padding: THEME.sizes.spacingXl,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: THEME.sizes.spacingLg,
  },
  detailLabel: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
  },
  detailValue: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
    fontWeight: "600",
  },
  solidDivider: {
    height: 1,
    backgroundColor: THEME.colors.borderLight,
    marginVertical: THEME.sizes.spacingLg,
  },
  totalLabel: {
    fontSize: THEME.sizes.lg,
    color: THEME.colors.text,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: THEME.sizes.xl,
    color: THEME.colors.primary,
    fontWeight: "800",
  },
  footer: {
    padding: THEME.sizes.spacingLg,
    paddingBottom: THEME.sizes.spacingXl,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
  },
  downloadBtn: {
    backgroundColor: THEME.colors.primary + "1A", // Semi transparent
  },
  downloadBtnText: {
    color: THEME.colors.primary,
  },
});
