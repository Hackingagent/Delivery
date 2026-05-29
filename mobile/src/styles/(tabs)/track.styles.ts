import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingVertical: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
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
  illustrationContainer: {
    alignItems: "center",
    marginVertical: THEME.sizes.spacingXl * 1.5,
  },
  circleBg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: THEME.colors.primary + "10", // 10% opacity
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: THEME.colors.text,
    textAlign: "center",
    marginBottom: THEME.sizes.spacingSm,
  },
  subtitle: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
    textAlign: "center",
    marginBottom: THEME.sizes.spacingXl * 1.2,
    paddingHorizontal: THEME.sizes.spacingXl,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    paddingHorizontal: THEME.sizes.spacingLg,
    height: 56,
    borderRadius: THEME.sizes.radiusLg,
    ...THEME.shadows.small,
    marginBottom: THEME.sizes.spacingLg,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  input: {
    flex: 1,
    marginLeft: THEME.sizes.spacingMd,
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
  },
  trackBtn: {
    marginBottom: THEME.sizes.spacingXl * 1.5,
    height: 56,
    borderRadius: THEME.sizes.radiusLg,
  },
  sectionTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingLg,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    ...THEME.shadows.small,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacingLg,
  },
  recentDetails: {
    flex: 1,
  },
  recentCode: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  recentStatus: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.success,
    fontWeight: "500",
  },
});
