import { THEME } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingTop:
      Platform.OS === "ios" ? THEME.sizes.spacing : THEME.sizes.spacingXl,
    paddingBottom: THEME.sizes.spacing,
    backgroundColor: THEME.colors.background,
  },
  headerTitle: {
    fontSize: THEME.sizes.xxxl,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
  },
  sectionTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingLg,
  },
  activityCard: {
    marginBottom: THEME.sizes.spacing,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.sizes.spacing,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: THEME.sizes.spacingSm,
  },
  dateText: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
  priceText: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  priceTextCancelled: {
    color: THEME.colors.textMuted,
    textDecorationLine: "line-through",
  },
  routeContainer: {
    gap: THEME.sizes.spacingSm,
    marginBottom: THEME.sizes.spacing,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: THEME.sizes.spacingSm,
  },
  routeText: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 181, 120, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.sizes.radiusPill,
  },
  statusBadgeError: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  statusText: {
    fontSize: THEME.sizes.xs,
    fontWeight: "600",
    color: THEME.colors.success,
  },
  statusTextError: {
    color: THEME.colors.error,
  },
});
