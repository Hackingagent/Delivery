import { THEME } from "@/constants/theme";
import React from "react";
import {
    ActivityIndicator,
    StyleProp,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";
import { styles } from "./Button.styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: "primary" | "secondary" | "outline" | "text";
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = "primary",
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  ...props
}) => {
  const isPrimary = type === "primary";
  const isSecondary = type === "secondary";
  const isOutline = type === "outline";
  const isText = type === "text";

  const getContainerStyle = () => {
    switch (type) {
      case "primary":
        return styles.primaryContainer;
      case "secondary":
        return styles.secondaryContainer;
      case "outline":
        return styles.outlineContainer;
      case "text":
        return styles.textModeContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "primary":
        return styles.primaryText;
      case "secondary":
        return styles.secondaryText;
      case "outline":
        return styles.outlineText;
      case "text":
        return styles.textModeText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getContainerStyle(),
        disabled && styles.disabledContainer,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            isOutline || isText ? THEME.colors.primary : THEME.colors.surface
          }
        />
      ) : (
        <>
          {icon && <React.Fragment>{icon}</React.Fragment>}
          <Text
            style={[
              styles.text,
              getTextStyle(),
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
