import React from "react";
import { View, ViewProps } from "react-native";
import { styles } from "./Card.styles";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevation?: "small" | "medium" | "large";
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = "small",
  noPadding = false,
  style,
  ...props
}) => {
  const getElevationStyle = () => {
    switch (elevation) {
      case "small":
        return styles.elevationSmall;
      case "medium":
        return styles.elevationMedium;
      case "large":
        return styles.elevationLarge;
      default:
        return styles.elevationSmall;
    }
  };

  return (
    <View
      style={[
        styles.container,
        getElevationStyle(),
        noPadding && styles.noPadding,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
