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
    ...THEME.shadows.small,
    zIndex: 10,
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
    gap: THEME.sizes.spacingLg,
  },
  sectionCard: {
    paddingBottom: THEME.sizes.spacingSm,
  },
  sectionTitle: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingLg,
  },
  timelineContainer: {
    position: "absolute",
    left: THEME.sizes.spacingLg + 10, // Aligning with icon inside input
    top: 65,
    bottom: 65,
    width: 2,
    alignItems: "center",
    zIndex: 1,
  },
  timelineDotStart: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.primary,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: THEME.colors.border,
    marginVertical: 4,
    borderStyle: "dashed",
  },
  timelineDotEnd: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.success,
  },
  inputsWrapper: {
    paddingLeft: THEME.sizes.spacingSm,
  },
  destinationInput: {
    marginBottom: 0,
  },
  summaryCard: {
    backgroundColor: THEME.colors.surface,
    borderColor: THEME.colors.primary,
    borderWidth: 1.5,
  },
  summaryTitle: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    fontWeight: "600",
    marginBottom: THEME.sizes.spacingSm,
  },
  fareRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: THEME.sizes.spacingSm,
    marginBottom: THEME.sizes.spacingSm,
  },
  fareAmount: {
    fontSize: THEME.sizes.xxxl,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  fareSubtitle: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
  },
  footer: {
    padding: THEME.sizes.spacingLg,
    paddingBottom: Platform.OS === "ios" ? 40 : THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
    ...THEME.shadows.medium,
  },
  recipientToggle: {
    flexDirection: "row",
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.sizes.radiusMd,
    padding: 4,
    marginBottom: THEME.sizes.spacingLg,
  },
  recipientOption: {
    flex: 1,
    paddingVertical: THEME.sizes.spacingSm,
    alignItems: "center",
    borderRadius: THEME.sizes.radiusMd - 2,
  },
  recipientOptionActive: {
    backgroundColor: THEME.colors.surface,
    ...THEME.shadows.small,
  },
  recipientOptionText: {
    fontSize: THEME.sizes.xs,
    fontWeight: "600",
    color: THEME.colors.textMuted,
  },
  recipientOptionTextActive: {
    color: THEME.colors.primary,
    fontWeight: "700",
  },
  userSearchResult: {
    padding: THEME.sizes.spacing,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
  },
  userName: {
    fontSize: THEME.sizes.sm,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  userPhone: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
});
