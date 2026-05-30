import { styles } from "@/styles/(tabs)/index.styles";
import { forwardRef } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export const BAMap = forwardRef<MapView, any>((props, ref) => {
  return (
    <MapView
      ref={ref}
      style={styles.map}
      initialRegion={props.initialRegion}
      showsUserLocation={true}
      showsMyLocationButton={false}
      provider={PROVIDER_DEFAULT}
      customMapStyle={props.mapStyle}
    >
      {props.children}
    </MapView>
  );
});

BAMap.displayName = "BAMap";
