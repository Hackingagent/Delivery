import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.sizes.spacing,
    width: "100%",
  },
  label: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.text,
    fontWeight: "600",
    marginBottom: THEME.sizes.spacingSm,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
    borderRadius: THEME.sizes.radiusMd,
    height: 56,
    paddingHorizontal: THEME.sizes.spacing,
  },
  inputFocused: {
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.surface,
    ...THEME.shadows.small,
  },
  inputError: {
    borderColor: THEME.colors.error,
  },
  iconContainer: {
    marginRight: THEME.sizes.spacingSm,
  },
  input: {
    flex: 1,
    height: "100%",
    color: THEME.colors.text,
    fontSize: THEME.sizes.md,
  },
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.sizes.xs,
    marginTop: 4,
    fontWeight: "500",
  },
});
