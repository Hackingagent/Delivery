import { styles } from "@/app/(tabs)/_index.styles";
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
      <Marker coordinate={{ latitude: 5.961, longitude: 10.155 }}>
        <View style={styles.driverMarkerContainer}>
          <View style={styles.driverMarker}>
            <Text style={styles.driverMarkerText}>🏍️</Text>
          </View>
          <View style={styles.driverMarkerTriangle} />
        </View>
      </Marker>
    </MapView>
  );
});

BAMap.displayName = "BAMap";
