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
  headerTitle: {
    fontSize: THEME.sizes.xl,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
    paddingBottom: 100,
  },
  balanceCard: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.sizes.radiusXl,
    padding: THEME.sizes.spacingXl,
    ...THEME.shadows.medium,
    alignItems: "center",
    marginBottom: THEME.sizes.spacingXl,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: THEME.sizes.md,
    marginBottom: THEME.sizes.spacingSm,
  },
  balanceAmount: {
    color: THEME.colors.surface,
    fontSize: 40,
    fontWeight: "800",
    marginBottom: THEME.sizes.spacingXl,
  },
  actionRow: {
    flexDirection: "row",
    gap: THEME.sizes.spacingLg,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingVertical: THEME.sizes.spacingMd,
    paddingHorizontal: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    gap: THEME.sizes.spacingSm,
  },
  actionBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  actionBtnText: {
    color: THEME.colors.surface,
    fontSize: THEME.sizes.md,
    fontWeight: "600",
  },
  promoSection: {
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusXl,
    marginBottom: THEME.sizes.spacingXl,
    ...THEME.shadows.small,
  },
  promoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingMd,
    gap: THEME.sizes.spacingSm,
  },
  promoTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "600",
    color: THEME.colors.text,
  },
  promoInputBox: {
    flexDirection: "row",
    gap: THEME.sizes.spacingMd,
  },
  promoInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    borderRadius: THEME.sizes.radiusMd,
    paddingHorizontal: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.background,
  },
  applyBtn: {
    backgroundColor: THEME.colors.primary,
    justifyContent: "center",
    paddingHorizontal: THEME.sizes.spacingXl,
    borderRadius: THEME.sizes.radiusMd,
  },
  applyBtnText: {
    color: THEME.colors.surface,
    fontWeight: "700",
    fontSize: THEME.sizes.md,
  },
  transactionsSection: {
    marginTop: THEME.sizes.spacingMd,
  },
  sectionTitle: {
    fontSize: THEME.sizes.xl,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingLg,
  },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacingMd,
    ...THEME.shadows.small,
  },
  txIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacingLg,
  },
  txDetails: {
    flex: 1,
  },
  txType: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  txDate: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
  txAmount: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
  },
});
