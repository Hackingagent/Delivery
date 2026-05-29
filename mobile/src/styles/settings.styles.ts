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
  sectionTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "600",
    color: THEME.colors.textLight,
    marginBottom: THEME.sizes.spacingSm,
    marginTop: THEME.sizes.spacingMd,
    marginLeft: THEME.sizes.spacingSm,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    overflow: "hidden",
    ...THEME.shadows.small,
    marginBottom: THEME.sizes.spacingXl,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: THEME.sizes.spacingLg,
    paddingHorizontal: THEME.sizes.spacingLg,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMargin: {
    marginRight: THEME.sizes.spacingLg,
  },
  settingLabel: {
    fontSize: THEME.sizes.md,
    fontWeight: "500",
    color: THEME.colors.text,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.borderLight,
    marginLeft: 54,
  },
  versionText: {
    textAlign: "center",
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textMuted,
    marginTop: THEME.sizes.spacingXl,
  },
});
