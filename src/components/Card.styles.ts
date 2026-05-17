import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    padding: THEME.sizes.spacingLg,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  elevationSmall: {
    ...THEME.shadows.small,
  },
  elevationMedium: {
    ...THEME.shadows.medium,
  },
  elevationLarge: {
    ...THEME.shadows.large,
  },
  noPadding: {
    padding: 0,
  },
});
