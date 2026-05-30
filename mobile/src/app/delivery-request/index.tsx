import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/delivery-request/styles";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Banknote,
    MapPin,
    Navigation,
    Package,
} from "lucide-react-native";
import { apiRequest } from "@/lib/api";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DeliveryRequestScreen() {
  const router = useRouter();
  const [calculating, setCalculating] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const fare = 1500; // Fixed fare for now as in the UI

  const handleConfirm = async () => {
    if (!pickupLocation || !dropoffLocation || !packageDetails) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
    }

    setCalculating(true);
    try {
        const response = await apiRequest<any>("/delivery-requests", {
            method: "POST",
            auth: "user",
            body: JSON.stringify({
                pickup_location: pickupLocation,
                pickup_lat: 5.9610,
                pickup_lng: 10.1550,
                dropoff_location: dropoffLocation,
                dropoff_lat: 5.9650,
                dropoff_lng: 10.1620,
                package_details: packageDetails,
                fare: fare,
            }),
        });

        const trackingId = response.request.id;
        Alert.alert(
            "Request Created", 
            `Your delivery request has been submitted. Tracking ID: BAM-${trackingId}`,
            [
                { text: "Go Home", onPress: () => router.replace("/(tabs)") },
                { text: "Track Now", onPress: () => router.push(`/track/${trackingId}`) }
            ]
        );
    } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to create delivery request.");
    } finally {
        setCalculating(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Delivery</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineDotStart} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineDotEnd} />
          </View>

          <View style={styles.inputsWrapper}>
            <Input
              placeholder="Pickup Location (e.g., Commercial Avenue)"
              value={pickupLocation}
              onChangeText={setPickupLocation}
              editable={!calculating}
              icon={<MapPin color={THEME.colors.primary} size={20} />}
            />
            <Input
              placeholder="Drop-off Destination (e.g., Nkwen)"
              value={dropoffLocation}
              onChangeText={setDropoffLocation}
              editable={!calculating}
              icon={<Navigation color={THEME.colors.success} size={20} />}
              style={styles.destinationInput}
            />
          </View>
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Package Information</Text>
          <Input
            placeholder="What are we delivering?"
            value={packageDetails}
            onChangeText={setPackageDetails}
            editable={!calculating}
            icon={<Package color={THEME.colors.textLight} size={20} />}
          />
        </Card>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Estimated Fare</Text>
          <View style={styles.fareRow}>
            <Banknote color={THEME.colors.success} size={24} />
            <Text style={styles.fareAmount}>1,500 FCFA</Text>
          </View>
          <Text style={styles.fareSubtitle}>
            Based on standard motorbike delivery in Bamenda.
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Confirm & Proceed to Payment"
          loading={calculating}
          onPress={handleConfirm}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
