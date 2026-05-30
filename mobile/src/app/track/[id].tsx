import { BAMap } from "@/components/BAMap";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/track.styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
    MessageSquare,
    Navigation,
    Phone,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "@/lib/api";

export default function TrackingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const mapRef = useRef(null);
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDelivery();
    const interval = setInterval(fetchDelivery, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [id]);

  const fetchDelivery = async () => {
    try {
        const response = await apiRequest<any>("/delivery-requests/" + id, { auth: "user" });
        if (response.data) {
            setDelivery(response.data);
            fitMap(response.data);
        }
    } catch (error) {
      console.error("Fetch tracking error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fitMap = (d: any) => {
    if (!mapRef.current || !d.pickup_lat || !d.dropoff_lat) return;

    const coordinates = [
      { latitude: Number(d.pickup_lat), longitude: Number(d.pickup_lng) },
      { latitude: Number(d.dropoff_lat), longitude: Number(d.dropoff_lng) },
    ];

    if (d.agent && d.agent.current_lat) {
      coordinates.push({ 
        latitude: Number(d.agent.current_lat), 
        longitude: Number(d.agent.current_lng) 
      });
    }

    (mapRef.current as any).fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  const getTimelineSteps = (d: any) => {
    const steps = [
      { id: 1, title: "Order Placed", time: formatTime(d.created_at), active: false, completed: true },
      { id: 2, title: "Courier Assigned", time: formatTime(d.assigned_at), active: d.status === 'assigned', completed: !!d.assigned_at },
      { id: 3, title: "Package Picked Up", time: formatTime(d.picked_up_at), active: d.status === 'in_transit', completed: !!d.picked_up_at },
      { id: 4, title: "Heading to Destination", time: d.status === 'in_transit' ? "Now" : "--:--", active: d.status === 'in_transit', completed: d.status === 'delivered' },
      { id: 5, title: "Delivered", time: formatTime(d.delivered_at), active: false, completed: d.status === 'delivered' },
    ];
    return steps;
  };

  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return "--:--";
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading && !delivery) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  if (!delivery) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Delivery tracking not found.</Text>
      </View>
    );
  }

  const steps = getTimelineSteps(delivery);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track #{delivery.id}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.mapContainer}>
          <BAMap 
            ref={mapRef} 
            initialRegion={{
                latitude: 5.9631,
                longitude: 10.1591,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }} 
            mapStyle={[]} 
          >
            {delivery.pickup_lat && delivery.dropoff_lat && (
              <>
                <Marker 
                  coordinate={{ latitude: Number(delivery.pickup_lat), longitude: Number(delivery.pickup_lng) }}
                  title="Pickup"
                  pinColor={THEME.colors.primary}
                />
                <Marker 
                  coordinate={{ latitude: Number(delivery.dropoff_lat), longitude: Number(delivery.dropoff_lng) }}
                  title="Dropoff"
                  pinColor={THEME.colors.secondary}
                />
                <Polyline
                  coordinates={[
                    { latitude: Number(delivery.pickup_lat), longitude: Number(delivery.pickup_lng) },
                    { latitude: Number(delivery.dropoff_lat), longitude: Number(delivery.dropoff_lng) },
                  ]}
                  strokeColor={THEME.colors.primary}
                  strokeWidth={3}
                  lineDashPattern={[5, 5]}
                />
              </>
            )}
            {delivery.agent && delivery.agent.current_lat && (
              <Marker coordinate={{ 
                latitude: Number(delivery.agent.current_lat), 
                longitude: Number(delivery.agent.current_lng) 
              }}>
                <View style={styles.driverMarkerContainer}>
                  <View style={styles.driverMarker}>
                    <Text style={styles.driverMarkerText}>🏍️</Text>
                  </View>
                  <View style={styles.driverMarkerTriangle} />
                </View>
              </Marker>
            )}
          </BAMap>
          <View style={styles.etaOverlay}>
            <Text style={styles.etaLabel}>Status</Text>
            <Text style={styles.etaTime}>{delivery.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          {delivery.agent && (
            <View style={styles.driverSection}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverInitials}>{delivery.agent.name.substring(0, 2).toUpperCase()}</Text>
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{delivery.agent.name}</Text>
                <Text style={styles.driverVehicle}>
                  {delivery.agent.vehicle_plate || "Active Agent"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => router.push("/delivery-request")}
              >
                <MessageSquare color={THEME.colors.primary} size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon} onPress={() => Alert.alert("Call", `Dialing ${delivery.agent.phone}`)}>
                <Phone color={THEME.colors.primary} size={20} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.timelineSection}>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepIndicator}>
                  {step.completed ? (
                    <CheckCircle2 color={THEME.colors.success} size={24} />
                  ) : step.active ? (
                    <Navigation
                      color={THEME.colors.primary}
                      size={24}
                      fill={THEME.colors.primary}
                    />
                  ) : (
                    <Circle color={THEME.colors.border} size={24} />
                  )}
                  {index !== steps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        step.completed && styles.stepLineActive,
                      ]}
                    />
                  )}
                </View>
                <View
                  style={[
                    styles.stepText,
                    step.active && styles.stepTextActiveContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepTitle,
                      step.active && styles.stepTitleActive,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
