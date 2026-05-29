import { THEME } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

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
    backgroundColor: THEME.colors.surface,
    zIndex: 10,
    ...THEME.shadows.small,
  },
  backBtn: {
    padding: THEME.sizes.spacingSm,
    marginLeft: -THEME.sizes.spacingSm,
  },
  headerTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mapContainer: {
    height: Dimensions.get("window").height * 0.35,
    width: "100%",
    position: "relative",
  },
  etaOverlay: {
    position: "absolute",
    top: THEME.sizes.spacingLg,
    left: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    ...THEME.shadows.medium,
  },
  etaLabel: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    fontWeight: "600",
  },
  etaTime: {
    fontSize: THEME.sizes.xl,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  contentCard: {
    flex: 1,
    backgroundColor: THEME.colors.surface,
    borderTopLeftRadius: THEME.sizes.radiusXl,
    borderTopRightRadius: THEME.sizes.radiusXl,
    marginTop: -THEME.sizes.radiusXl,
    padding: THEME.sizes.spacingXl,
    ...THEME.shadows.medium,
  },
  driverSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: THEME.sizes.spacingXl,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
    marginBottom: THEME.sizes.spacingXl,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacingMd,
  },
  driverInitials: {
    color: THEME.colors.surface,
    fontWeight: "800",
    fontSize: THEME.sizes.md,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  driverVehicle: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.primary + "1A",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: THEME.sizes.spacingSm,
  },
  timelineSection: {
    flex: 1,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: THEME.sizes.spacingLg,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: THEME.sizes.spacingLg,
    width: 24,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: THEME.colors.border,
    minHeight: 30,
    marginTop: 4,
    marginBottom: -10,
  },
  stepLineActive: {
    backgroundColor: THEME.colors.success,
  },
  stepText: {
    flex: 1,
    paddingBottom: THEME.sizes.spacingSm,
  },
  stepTextActiveContainer: {
    backgroundColor: THEME.colors.primary + "10",
    padding: THEME.sizes.spacingMd,
    borderRadius: THEME.sizes.radiusMd,
    marginTop: -8,
  },
  stepTitle: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.textLight,
  },
  stepTitleActive: {
    color: THEME.colors.primary,
    fontWeight: "800",
  },
  stepTime: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
});
