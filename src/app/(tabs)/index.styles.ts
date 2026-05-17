import { THEME } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  driverMarkerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  driverMarker: {
    backgroundColor: THEME.colors.surface,
    padding: 6,
    borderRadius: 20,
    ...THEME.shadows.medium,
  },
  driverMarkerText: {
    fontSize: 20,
  },
  driverMarkerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: THEME.colors.surface,
    transform: [{ rotate: "180deg" }],
    marginTop: -2,
  },
  headerContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: THEME.sizes.spacing,
    right: THEME.sizes.spacing,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  menuButton: {
    backgroundColor: THEME.colors.surface,
    padding: 12,
    borderRadius: THEME.sizes.radiusPill,
    marginRight: THEME.sizes.spacing,
    ...THEME.shadows.small,
  },
  searchCard: {
    flex: 1,
    borderRadius: THEME.sizes.radiusPill,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: THEME.sizes.spacingSm,
  },
  searchText: {
    color: THEME.colors.textMuted,
    fontSize: THEME.sizes.md,
    fontWeight: "500",
  },
  actionsContainer: {
    position: "absolute",
    right: THEME.sizes.spacing,
    bottom: 260,
  },
  actionButton: {
    backgroundColor: THEME.colors.surface,
    padding: 14,
    borderRadius: THEME.sizes.radiusPill,
    ...THEME.shadows.medium,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.colors.surface,
    borderTopLeftRadius: THEME.sizes.radiusXl,
    borderTopRightRadius: THEME.sizes.radiusXl,
    padding: THEME.sizes.spacingLg,
    paddingBottom: Platform.OS === "ios" ? 40 : THEME.sizes.spacingLg,
    ...THEME.shadows.large,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: THEME.colors.borderLight,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: THEME.sizes.spacingLg,
  },
  sheetTitle: {
    fontSize: THEME.sizes.xl,
    fontWeight: "800",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingSm,
  },
  sheetSubtitle: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    marginBottom: THEME.sizes.spacingXl,
  },
  requestButton: {
    width: "100%",
  },
});
