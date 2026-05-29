import { THEME } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.75;

export const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: height,
    backgroundColor: THEME.colors.surface,
    borderTopRightRadius: THEME.sizes.radiusXl,
    borderBottomRightRadius: THEME.sizes.radiusXl,
    overflow: "hidden",
    ...THEME.shadows.large,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingTop: THEME.sizes.spacingXl,
    paddingBottom: THEME.sizes.spacingLg,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
  },
  userName: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
  menuItems: {
    flex: 1,
    paddingTop: THEME.sizes.spacingLg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: THEME.sizes.spacingLg,
    paddingHorizontal: THEME.sizes.spacingLg,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: THEME.sizes.radiusMd,
    backgroundColor: THEME.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacing,
  },
  menuItemLabel: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingVertical: THEME.sizes.spacingXl,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
  },
  logoutText: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.error,
    marginLeft: THEME.sizes.spacing,
  },
});
