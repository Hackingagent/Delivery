import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Crosshair, Menu, Package, Search } from "lucide-react-native";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from "./index.styles";

// Dummy Bamenda Coordinates
const INITIAL_REGION = {
  latitude: 5.9631,
  longitude: 10.1591,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function DashboardMapScreen() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const handleCurrentLocation = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Background Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        provider={PROVIDER_DEFAULT}
        customMapStyle={mapStyle}
      >
        {/* Example Driver Markers */}
        <Marker coordinate={{ latitude: 5.961, longitude: 10.155 }}>
          <View style={styles.driverMarkerContainer}>
            <View style={styles.driverMarker}>
              <Text style={styles.driverMarkerText}>🏍️</Text>
            </View>
            <View style={styles.driverMarkerTriangle} />
          </View>
        </Marker>
      </MapView>

      {/* Floating Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Menu color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Card noPadding elevation="small" style={styles.searchCard}>
          <TouchableOpacity style={styles.searchButton}>
            <Search color={THEME.colors.primary} size={20} />
            <Text style={styles.searchText}>Where do you need delivery?</Text>
          </TouchableOpacity>
        </Card>
      </View>

      {/* Action Buttons Overlay */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleCurrentLocation}
        >
          <Crosshair color={THEME.colors.text} size={24} />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal Mockup */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />
        <Text style={styles.sheetTitle}>Request a Delivery</Text>
        <Text style={styles.sheetSubtitle}>
          Enter destination to calculate Bamenda fee
        </Text>

        <Button
          title="Start Request"
          icon={<Package color={THEME.colors.surface} size={20} />}
          onPress={() => router.push("/delivery-request/")}
          style={styles.requestButton}
        />
      </View>
    </View>
  );
}

// Gentle grayscale/clean map style
const mapStyle = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "2.00",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#9c9c9c",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7b7b7b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#46bcec",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#c8d7d4",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#070707",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];
