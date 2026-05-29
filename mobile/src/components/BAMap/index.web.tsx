import { styles } from "@/styles/(tabs)/index.styles";
import { THEME } from "@/constants/theme";
import { Map as MapIcon } from "lucide-react-native";
import { forwardRef } from "react";
import { Text, View } from "react-native";

export const BAMap = forwardRef((props, ref) => {
  return (
    <View
      style={[
        styles.map,
        {
          backgroundColor: "#E5E5EA",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <MapIcon color={THEME.colors.textMuted} size={48} />
      <Text
        style={{
          marginTop: 10,
          color: THEME.colors.textMuted,
          fontWeight: "500",
        }}
      >
        Live Map is optimized for the mobile app
      </Text>
    </View>
  );
});

BAMap.displayName = "BAMap";
