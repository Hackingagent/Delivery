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
    paddingTop: 100,
    paddingBottom: 40,
  },
  header: {
    marginBottom: THEME.sizes.spacingXl,
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
  submitButton: {
    marginTop: THEME.sizes.spacingSm,
    marginBottom: THEME.sizes.spacingLg,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: THEME.colors.textLight,
    fontSize: THEME.sizes.md,
  },
});
