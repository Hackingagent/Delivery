import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: THEME.sizes.spacingLg,
  },
  backButton: {
    padding: THEME.sizes.spacingSm,
    marginLeft: -THEME.sizes.spacingSm,
  },
  scrollContent: {
    flexGrow: 1,
    padding: THEME.sizes.spacingLg,
    justifyContent: "center",
  },
  formContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: THEME.sizes.xxl,
    fontWeight: "800",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingSm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
    marginBottom: THEME.sizes.spacingXl,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: THEME.sizes.spacingSm,
    marginBottom: THEME.sizes.spacingXl * 1.5,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: THEME.sizes.sm,
    fontWeight: "600",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingSm,
  },
  textInput: {
    width: "100%",
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    borderRadius: THEME.sizes.radiusMd,
    padding: THEME.sizes.spacing,
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
    minHeight: 120,
  },
  footer: {
    padding: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.background,
  },
  successContainer: {
    alignItems: "center",
    paddingVertical: THEME.sizes.spacingXl * 2,
  },
  successTitle: {
    marginTop: THEME.sizes.spacingLg,
    fontSize: THEME.sizes.xxl,
    fontWeight: "800",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingSm,
  },
  successSubtitle: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
    textAlign: "center",
    paddingHorizontal: THEME.sizes.spacingLg,
  },
});
