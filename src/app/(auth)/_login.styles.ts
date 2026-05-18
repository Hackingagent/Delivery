import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: THEME.sizes.spacingLg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: THEME.sizes.spacingXl,
  },
  logoContainer: {
    marginBottom: THEME.sizes.spacingLg,
    ...THEME.shadows.medium,
  },
  logoShape: {
    width: 80,
    height: 80,
    borderRadius: THEME.sizes.radiusXl,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: THEME.colors.surface,
    fontSize: THEME.sizes.xxxl,
    fontWeight: "800",
  },
  title: {
    fontSize: THEME.sizes.xxl,
    fontWeight: "800",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingSm,
  },
  subtitle: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
  },
  formContainer: {
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusXl,
    ...THEME.shadows.small,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: THEME.sizes.spacingLg,
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: THEME.sizes.sm,
  },
  submitButton: {
    marginBottom: THEME.sizes.spacingLg,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: THEME.colors.textLight,
    fontSize: THEME.sizes.md,
  },
});
