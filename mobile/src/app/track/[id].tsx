import { BAMap } from "@/components/BAMap";
import { THEME } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Expand,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  X,
} from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "@/lib/api";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const BAMENDA_CENTER = { latitude: 5.9631, longitude: 10.1591 };

// Custom marker view components
const PickupMarker = () => (
  <View style={markerStyles.pickupContainer}>
    <View style={markerStyles.pickupBadge}>
      <Text style={markerStyles.markerLetter}>P</Text>
    </View>
    <Text style={markerStyles.markerLabel}>PICKUP</Text>
    <View style={markerStyles.markerPin} />
  </View>
);

const DropoffMarker = () => (
  <View style={markerStyles.dropoffContainer}>
    <View style={markerStyles.dropoffBadge}>
      <Text style={markerStyles.markerLetter}>D</Text>
    </View>
    <Text style={markerStyles.markerLabel}>DELIVERY</Text>
    <View style={[markerStyles.markerPin, { backgroundColor: THEME.colors.secondary }]} />
  </View>
);

const AgentMarker = () => (
  <View style={markerStyles.agentContainer}>
    <View style={markerStyles.agentBadge}>
      <Text style={markerStyles.agentText}>🏍️</Text>
    </View>
    <View style={markerStyles.agentTriangle} />
  </View>
);

const markerStyles = StyleSheet.create({
  pickupContainer: { alignItems: "center" },
  dropoffContainer: { alignItems: "center" },
  agentContainer: { alignItems: "center" },
  pickupBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dropoffBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  agentBadge: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerLetter: { color: "#fff", fontWeight: "800", fontSize: 14 },
  markerLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: THEME.colors.text,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
    overflow: "hidden",
  },
  markerPin: {
    width: 3,
    height: 10,
    backgroundColor: THEME.colors.primary,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  agentText: { fontSize: 22 },
  agentTriangle: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff",
    marginTop: -2,
  },
});

export default function TrackingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);
  const fullMapRef = useRef<MapView | null>(null);
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [mapExpanded, setMapExpanded] = useState(false);

  const fetchRoute = useCallback(async (pickup: any, dropoff: any) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoords(coords);
      }
    } catch (e) {
      console.warn("OSRM routing failed, falling back to straight line:", e);
      // Fallback to straight line if OSRM is unreachable
      setRouteCoords([
        { latitude: Number(pickup.lat), longitude: Number(pickup.lng) },
        { latitude: Number(dropoff.lat), longitude: Number(dropoff.lng) },
      ]);
    }
  }, []);

  const fitMap = useCallback((ref: MapView | null, d: any) => {
    if (!ref || !d?.pickup_lat || !d?.dropoff_lat) return;
    const coordinates = [
      { latitude: Number(d.pickup_lat), longitude: Number(d.pickup_lng) },
      { latitude: Number(d.dropoff_lat), longitude: Number(d.dropoff_lng) },
    ];
    if (d.agent?.current_lat) {
      coordinates.push({
        latitude: Number(d.agent.current_lat),
        longitude: Number(d.agent.current_lng),
      });
    }
    setTimeout(() => {
      try {
        ref.fitToCoordinates(coordinates, {
          edgePadding: { top: 80, right: 60, bottom: 60, left: 60 },
          animated: true,
        });
      } catch (e) { /* map may not be ready */ }
    }, 500);
  }, []);

  const fetchDelivery = useCallback(async () => {
    try {
      const response = await apiRequest<any>("/user/delivery-requests/" + id, { auth: "user" });
      if (response.data) {
        const d = response.data;
        setDelivery(d);
        if (d.pickup_lat && d.dropoff_lat) {
          // Fetch OSRM road route
          await fetchRoute(
            { lat: d.pickup_lat, lng: d.pickup_lng },
            { lat: d.dropoff_lat, lng: d.dropoff_lng }
          );
          fitMap(mapRef.current, d);
        }
      }
    } catch (error) {
      console.error("Fetch tracking error:", error);
    } finally {
      setLoading(false);
    }
  }, [id, fetchRoute, fitMap]);

  useEffect(() => {
    fetchDelivery();
    const interval = setInterval(fetchDelivery, 15000);
    return () => clearInterval(interval);
  }, [fetchDelivery]);

  const getTimelineSteps = (d: any) => [
    { id: 1, title: "Order Placed", time: formatTime(d.created_at), active: false, completed: true },
    { id: 2, title: "Courier Assigned", time: formatTime(d.assigned_at), active: d.status === "assigned", completed: !!d.assigned_at },
    { id: 3, title: "Package Picked Up", time: formatTime(d.picked_up_at), active: d.status === "in_transit", completed: !!d.picked_up_at },
    { id: 4, title: "Heading to Destination", time: d.status === "in_transit" ? "Now" : "--:--", active: d.status === "in_transit", completed: d.status === "delivered" },
    { id: 5, title: "Delivered", time: formatTime(d.delivered_at), active: false, completed: d.status === "delivered" },
  ];

  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return "--:--";
    return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMapContent = () => (
    <>
      {delivery?.pickup_lat && delivery?.dropoff_lat && (
        <>
          {/* Road-aware route from OSRM */}
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor={THEME.colors.primary}
              strokeWidth={4}
              lineJoin="round"
              lineCap="round"
            />
          )}
          <Marker
            coordinate={{ latitude: Number(delivery.pickup_lat), longitude: Number(delivery.pickup_lng) }}
            title={`Pickup: ${delivery.pickup_location}`}
            anchor={{ x: 0.5, y: 1 }}
          >
            <PickupMarker />
          </Marker>
          <Marker
            coordinate={{ latitude: Number(delivery.dropoff_lat), longitude: Number(delivery.dropoff_lng) }}
            title={`Dropoff: ${delivery.dropoff_location}`}
            anchor={{ x: 0.5, y: 1 }}
          >
            <DropoffMarker />
          </Marker>
        </>
      )}
      {delivery?.agent?.current_lat && (
        <Marker
          coordinate={{
            latitude: Number(delivery.agent.current_lat),
            longitude: Number(delivery.agent.current_lng),
          }}
          title={`Agent: ${delivery.agent?.name}`}
          anchor={{ x: 0.5, y: 1 }}
        >
          <AgentMarker />
        </Marker>
      )}
    </>
  );

  if (loading && !delivery) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  if (!delivery) {
    return (
      <View style={styles.center}>
        <Text>Delivery tracking not found.</Text>
      </View>
    );
  }

  const steps = getTimelineSteps(delivery);
  const statusColor = delivery.status === "delivered"
    ? THEME.colors.success
    : delivery.status === "in_transit"
    ? THEME.colors.primary
    : THEME.colors.secondary;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BAM-{delivery.id}</Text>
        <View style={[styles.statusPill, { backgroundColor: statusColor + "20" }]}>
          <Text style={[styles.statusPillText, { color: statusColor }]}>
            {delivery.status.replace("_", " ").toUpperCase()}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>

        {/* ── MAP ── */}
        <View style={styles.mapContainer}>
          <BAMap
            ref={mapRef}
            initialRegion={{ ...BAMENDA_CENTER, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
            mapStyle={[]}
          >
            {renderMapContent()}
          </BAMap>

          {/* Status overlay */}
          <View style={styles.etaOverlay}>
            <Text style={styles.etaLabel}>Status</Text>
            <Text style={[styles.etaTime, { color: statusColor }]}>
              {delivery.status.replace("_", " ").toUpperCase()}
            </Text>
          </View>

          {/* Expand button */}
          <TouchableOpacity style={styles.expandBtn} onPress={() => setMapExpanded(true)}>
            <Expand color={THEME.colors.text} size={18} />
          </TouchableOpacity>
        </View>

        {/* ── CONTENT CARD ── */}
        <View style={styles.contentCard}>

          {/* Agent section */}
          {delivery.agent && (
            <View style={styles.agentSection}>
              <View style={styles.agentAvatar}>
                <Text style={styles.agentInitials}>
                  {delivery.agent.name.substring(0, 2).toUpperCase()}
                </Text>
              </View>
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{delivery.agent.name}</Text>
                <Text style={styles.agentSub}>{delivery.agent.vehicle_plate || "Active Agent"}</Text>
              </View>
              <TouchableOpacity style={styles.actionIcon} onPress={() => Alert.alert("Call", `Dialing ${delivery.agent.phone}`)}>
                <Phone color={THEME.colors.primary} size={18} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon} onPress={() => router.push("/delivery-request")}>
                <MessageSquare color={THEME.colors.primary} size={18} />
              </TouchableOpacity>
            </View>
          )}

          {/* Route summary */}
          <View style={styles.routeSummary}>
            <View style={styles.routeRow}>
              <View style={styles.dotOrigin} />
              <View style={styles.routeTextGroup}>
                <Text style={styles.routeLabel}>PICKUP</Text>
                <Text style={styles.routeText}>{delivery.pickup_location}</Text>
              </View>
            </View>
            <View style={styles.routeDivider} />
            <View style={styles.routeRow}>
              <View style={styles.dotDest} />
              <View style={styles.routeTextGroup}>
                <Text style={styles.routeLabel}>DELIVERY</Text>
                <Text style={styles.routeText}>{delivery.dropoff_location}</Text>
              </View>
            </View>
          </View>

          {/* Timeline */}
          <Text style={styles.sectionTitle}>Delivery Timeline</Text>
          <View style={styles.timelineSection}>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepIndicator}>
                  {step.completed ? (
                    <CheckCircle2 color={THEME.colors.success} size={24} />
                  ) : step.active ? (
                    <Navigation color={THEME.colors.primary} size={24} fill={THEME.colors.primary} />
                  ) : (
                    <Circle color={THEME.colors.border} size={24} />
                  )}
                  {index !== steps.length - 1 && (
                    <View style={[styles.stepLine, step.completed && styles.stepLineActive]} />
                  )}
                </View>
                <View style={[styles.stepText, step.active && styles.stepActive]}>
                  <Text style={[styles.stepTitle, step.active && styles.stepTitleActive]}>{step.title}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Proof of delivery images */}
          {(delivery.pickup_image_url || delivery.delivery_image_url) && (
            <View style={styles.proofSection}>
              <Text style={styles.sectionTitle}>Verification Photos</Text>
              <View style={styles.proofGrid}>
                {delivery.pickup_image_url && (
                  <View style={styles.proofCard}>
                    <Image source={{ uri: delivery.pickup_image_url }} style={styles.proofImage} />
                    <Text style={styles.proofLabel}>📦 Pick Up</Text>
                  </View>
                )}
                {delivery.delivery_image_url && (
                  <View style={styles.proofCard}>
                    <Image source={{ uri: delivery.delivery_image_url }} style={styles.proofImage} />
                    <Text style={styles.proofLabel}>✅ Delivered</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ── FULLSCREEN MAP MODAL ── */}
      <Modal visible={mapExpanded} animationType="slide" statusBarTranslucent>
        <SafeAreaView style={styles.fullscreenMap}>
          <TouchableOpacity style={styles.fullscreenClose} onPress={() => {
            setMapExpanded(false);
            // Re-fit the small map after closing
            setTimeout(() => fitMap(mapRef.current, delivery), 300);
          }}>
            <X color="#fff" size={24} />
          </TouchableOpacity>
          <MapView
            ref={fullMapRef}
            style={{ flex: 1 }}
            initialRegion={{ ...BAMENDA_CENTER, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
            showsUserLocation
            onMapReady={() => fitMap(fullMapRef.current, delivery)}
          >
            {renderMapContent()}
          </MapView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: THEME.colors.surface,
    ...THEME.shadows.small,
  },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: THEME.colors.text },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusPillText: { fontSize: 10, fontWeight: "800" },
  scrollContent: { flexGrow: 1 },

  // Map
  mapContainer: {
    height: SCREEN_HEIGHT * 0.38,
    width: "100%",
    position: "relative",
  },
  etaOverlay: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  etaLabel: { fontSize: 11, color: THEME.colors.textMuted, fontWeight: "600", textTransform: "uppercase" },
  etaTime: { fontSize: 16, fontWeight: "800", marginTop: 1 },
  expandBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  // Content Card
  contentCard: {
    backgroundColor: THEME.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 20,
    paddingBottom: 40,
    ...THEME.shadows.medium,
    flex: 1,
  },

  // Agent section
  agentSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
    marginBottom: 16,
  },
  agentAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: THEME.colors.primary,
    justifyContent: "center", alignItems: "center",
    marginRight: 12,
  },
  agentInitials: { color: "#fff", fontWeight: "800", fontSize: 16 },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 16, fontWeight: "700", color: THEME.colors.text },
  agentSub: { fontSize: 13, color: THEME.colors.textLight },
  actionIcon: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: THEME.colors.primary + "1A",
    justifyContent: "center", alignItems: "center",
    marginLeft: 8,
  },

  // Route
  routeSummary: {
    backgroundColor: THEME.colors.background,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  routeRow: { flexDirection: "row", alignItems: "flex-start" },
  dotOrigin: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: THEME.colors.primary,
    marginRight: 12, marginTop: 3,
  },
  dotDest: {
    width: 12, height: 12,
    borderWidth: 2, borderColor: THEME.colors.secondary,
    borderRadius: 6,
    marginRight: 12, marginTop: 3,
  },
  routeDivider: {
    width: 2, height: 16, backgroundColor: THEME.colors.borderLight,
    marginLeft: 5, marginVertical: 4,
  },
  routeTextGroup: { flex: 1 },
  routeLabel: { fontSize: 10, fontWeight: "700", color: THEME.colors.textMuted, textTransform: "uppercase" },
  routeText: { fontSize: 14, fontWeight: "600", color: THEME.colors.text, marginTop: 2 },

  // Timeline
  sectionTitle: { fontSize: 14, fontWeight: "700", color: THEME.colors.textMuted, textTransform: "uppercase", marginBottom: 12 },
  timelineSection: { marginBottom: 20 },
  stepRow: { flexDirection: "row", marginBottom: 12 },
  stepIndicator: { alignItems: "center", marginRight: 14, width: 24 },
  stepLine: { width: 2, flex: 1, backgroundColor: THEME.colors.border, minHeight: 24, marginTop: 4, marginBottom: -8 },
  stepLineActive: { backgroundColor: THEME.colors.success },
  stepText: { flex: 1, paddingBottom: 4 },
  stepActive: {
    backgroundColor: THEME.colors.primary + "10",
    padding: 8, borderRadius: 10, marginTop: -4,
  },
  stepTitle: { fontSize: 14, fontWeight: "600", color: THEME.colors.textLight },
  stepTitleActive: { color: THEME.colors.primary, fontWeight: "800" },
  stepTime: { fontSize: 12, color: THEME.colors.textMuted, marginTop: 2 },

  // Proof images
  proofSection: { marginTop: 4 },
  proofGrid: { flexDirection: "row", gap: 12 },
  proofCard: {
    flex: 1, borderRadius: 12, overflow: "hidden",
    backgroundColor: THEME.colors.background,
    ...THEME.shadows.small,
  },
  proofImage: { width: "100%", height: 130, resizeMode: "cover" },
  proofLabel: { padding: 8, fontSize: 12, fontWeight: "700", textAlign: "center", color: THEME.colors.text },

  // Fullscreen modal
  fullscreenMap: { flex: 1, backgroundColor: "#000" },
  fullscreenClose: {
    position: "absolute",
    top: 16, right: 16, zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20, padding: 10,
  },
});
