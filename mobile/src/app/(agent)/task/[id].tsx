import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { apiRequest } from "@/lib/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Camera, CheckCircle, MapPin, Package } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Location from 'expo-location';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';

const AgentTaskDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  const fetchDelivery = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest<any>("/agent/deliveries", { auth: "agent" });
      const found = response.data.find((d: any) => d.id.toString() === id);
      setDelivery(found);
    } catch (error: any) {
      Alert.alert("Error", "Failed to fetch delivery details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const stopWatchingLocation = useCallback(() => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  }, []);

  const startWatchingLocation = useCallback(async () => {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        console.warn('Location permission denied');
        return;
      }

      stopWatchingLocation();

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 15000,
          distanceInterval: 10,
        },
        async (location) => {
          const { latitude, longitude } = location.coords;
          try {
            await apiRequest("/agent/location", {
              method: "POST",
              auth: "agent",
              body: JSON.stringify({ lat: latitude, lng: longitude }),
            });
          } catch (e) {
            console.error("Failed to report location", e);
          }
        }
      );
    } catch (e) {
      console.error("Error starting location watch", e);
    }
  }, [stopWatchingLocation]);

  useEffect(() => {
    fetchDelivery();
  }, [fetchDelivery]);

  useEffect(() => {
    if (delivery?.status === 'in_transit') {
      startWatchingLocation();
    } else {
      stopWatchingLocation();
    }

    return () => {
      stopWatchingLocation();
    };
  }, [delivery?.status, startWatchingLocation, stopWatchingLocation]);

  const handleUpdateStatus = async (status: 'pickup' | 'deliver') => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      Alert.alert("Permission Error", "Camera access is required for proof of delivery.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setUpdating(true);

      const formData = new FormData();
      formData.append(status === 'pickup' ? 'pickup_image' : 'delivery_image', {
        uri: image.uri,
        name: `photo_${status}.jpg`,
        type: 'image/jpeg',
      } as any);

      try {
        await apiRequest(`/agent/deliveries/${id}/${status}`, {
          method: "POST",
          auth: "agent",
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Alert.alert("Success", `Status updated to ${status === 'pickup' ? 'In Transit' : 'Delivered'}.`);
        if (status === 'deliver') {
          router.replace('/(agent)');
        } else {
          fetchDelivery();
        }
      } catch (error: any) {
        Alert.alert("Update Failed", error.message || "Failed to update status.");
      } finally {
        setUpdating(false);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  if (!delivery) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Task not found or unauthorized.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.idText}>Request #{delivery.id}</Text>
          <View style={[styles.statusBadge, { 
            backgroundColor: delivery.status === 'in_transit' ? THEME.colors.primary + '20' : THEME.colors.secondary + '20'
          }]}>
            <Text style={[styles.statusText, { 
              color: delivery.status === 'in_transit' ? THEME.colors.primary : THEME.colors.secondary
            }]}>
              {delivery.status.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Customer Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.userName}>{delivery.user?.name}</Text>
            <Text style={styles.userPhone}>{delivery.user?.phone}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Package Info</Text>
          <View style={styles.pkgRow}>
            <Package color={THEME.colors.primary} size={20} />
            <Text style={styles.pkgText}>{delivery.package_details}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Route</Text>
          <View style={styles.locationGroup}>
            <View style={styles.locationRow}>
              <View style={styles.dotOrigin} />
              <Text style={styles.locationText}>{delivery.pickup_location}</Text>
            </View>
            <View style={styles.locationLine} />
            <View style={styles.locationRow}>
              <View style={styles.dotDest} />
              <Text style={styles.locationText}>{delivery.dropoff_location}</Text>
            </View>
          </View>
        </View>

        {delivery.status === 'assigned' && (
          <Button
            title="Confirm Pick Up"
            loading={updating}
            icon={<Camera color={THEME.colors.surface} size={20} />}
            onPress={() => handleUpdateStatus('pickup')}
            style={styles.actionButton}
          />
        )}

        {delivery.status === 'in_transit' && (
          <Button
            title="Mark Delivered"
            loading={updating}
            icon={<CheckCircle color={THEME.colors.surface} size={20} />}
            onPress={() => handleUpdateStatus('deliver')}
            style={[styles.actionButton, { backgroundColor: THEME.colors.success }]}
          />
        )}

        {delivery.status === 'delivered' && (
          <View style={styles.completedBox}>
            <CheckCircle color={THEME.colors.success} size={32} />
            <Text style={styles.completedText}>Delivery Completed</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  idText: {
    fontSize: 22,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    backgroundColor: THEME.colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    ...THEME.shadows.small,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
  },
  userPhone: {
    fontSize: 14,
    color: THEME.colors.primary,
    fontWeight: "600",
  },
  pkgRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pkgText: {
    fontSize: 16,
    color: THEME.colors.text,
  },
  locationGroup: {
    marginTop: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotOrigin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.primary,
    marginRight: 12,
  },
  dotDest: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: THEME.colors.secondary,
    marginRight: 12,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: THEME.colors.border,
    marginLeft: 4,
    marginVertical: 2,
  },
  locationText: {
    fontSize: 15,
    color: THEME.colors.text,
    fontWeight: "500",
  },
  actionButton: {
    marginTop: 20,
    height: 56,
  },
  completedBox: {
    marginTop: 40,
    alignItems: "center",
    gap: 12,
  },
  completedText: {
    fontSize: 20,
    fontWeight: "700",
    color: THEME.colors.success,
  },
});

export default AgentTaskDetailScreen;
