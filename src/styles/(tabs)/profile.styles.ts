import { THEME } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: THEME.sizes.spacingXl,
    marginTop:
      Platform.OS === "ios" ? THEME.sizes.spacing : THEME.sizes.spacingXl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: THEME.colors.border,
    marginBottom: THEME.sizes.spacing,
    ...THEME.shadows.medium,
  },
  userName: {
    fontSize: THEME.sizes.xxl,
    fontWeight: "800",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
    marginBottom: THEME.sizes.spacing,
  },
  badge: {
    backgroundColor: "#FFF5F0", // Light primary
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.sizes.radiusPill,
    borderWidth: 1,
    borderColor: THEME.colors.primaryLight,
  },
  badgeText: {
    color: THEME.colors.primaryDark,
    fontSize: THEME.sizes.xs,
    fontWeight: "700",
  },
  settingsContainer: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    marginBottom: THEME.sizes.spacingLg,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: THEME.sizes.spacing,
    backgroundColor: THEME.colors.surface,
  },
  settingIcon: {
    marginRight: THEME.sizes.spacing,
  },
  settingText: {
    flex: 1,
    fontSize: THEME.sizes.md,
    fontWeight: "500",
    color: THEME.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.borderLight,
    marginLeft: 54,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: THEME.sizes.spacing,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.2)",
    marginBottom: THEME.sizes.spacingXl,
    gap: THEME.sizes.spacingSm,
  },
  logoutText: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.error,
  },
  versionText: {
    textAlign: "center",
    color: THEME.colors.textMuted,
    fontSize: THEME.sizes.xs,
  },
});
