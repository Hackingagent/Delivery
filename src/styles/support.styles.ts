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
  greeting: {
    fontSize: THEME.sizes.xxl,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  subGreeting: {
    fontSize: THEME.sizes.lg,
    color: THEME.colors.textLight,
    marginTop: THEME.sizes.spacingSm,
    marginBottom: THEME.sizes.spacingXl,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    paddingHorizontal: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    height: 56,
    ...THEME.shadows.small,
    marginBottom: THEME.sizes.spacingXl * 1.5,
  },
  searchInput: {
    flex: 1,
    marginLeft: THEME.sizes.spacingMd,
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
  },
  contactSection: {
    gap: THEME.sizes.spacingLg,
    marginBottom: THEME.sizes.spacingXl * 1.5,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    ...THEME.shadows.small,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacingLg,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  contactDesc: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
  sectionTitle: {
    fontSize: THEME.sizes.xl,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingLg,
  },
  faqList: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    overflow: "hidden",
    ...THEME.shadows.small,
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: THEME.sizes.spacingLg,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
  },
  faqText: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
    fontWeight: "500",
  },
});
