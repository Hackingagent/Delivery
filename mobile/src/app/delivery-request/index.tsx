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
    User,
    Phone,
    Search,
    Check,
} from "lucide-react-native";
import { apiRequest } from "@/lib/api";
import { useState, useCallback, useEffect } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";

export default function DeliveryRequestScreen() {
  const router = useRouter();
  const [calculating, setCalculating] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  
  // Recipient State
  const [recipientType, setRecipientType] = useState<"platform" | "manual">("manual");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientUserId, setRecipientUserId] = useState<number | null>(null);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const fare = 1500;

  const performSearch = async (query: string) => {
    if (!query.trim()) {
        setSearchResults([]);
        return;
    }
    setSearching(true);
    try {
        const response = await apiRequest<any>(`/user/users?search=${query}`, { auth: "user" });
        setSearchResults(response.data || []);
    } catch (error) {
        console.error("Search users error:", error);
    } finally {
        setSearching(false);
    }
  };

  useEffect(() => {
    if (recipientType !== "platform" || !userSearchQuery.trim()) {
        setSearchResults([]);
        return;
    }

    const handler = setTimeout(() => {
        performSearch(userSearchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [userSearchQuery, recipientType]);

  const selectUser = (user: any) => {
    setRecipientUserId(user.id);
    setRecipientName(user.name);
    setRecipientPhone(user.phone || "");
    setUserSearchQuery(user.name);
    setSearchResults([]);
  };

  const handleConfirm = async () => {
    if (!pickupLocation || !dropoffLocation || !packageDetails) {
        Alert.alert("Error", "Please fill in all location and package fields.");
        return;
    }

    if (!recipientName || !recipientPhone) {
        Alert.alert("Error", "Please provide recipient name and phone.");
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
                recipient_name: recipientName,
                recipient_phone: recipientPhone,
                recipient_user_id: recipientUserId,
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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

        {/* Recipient Details */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Recipient Information</Text>
          
          <View style={styles.recipientToggle}>
            <TouchableOpacity 
                style={[styles.recipientOption, recipientType === "manual" && styles.recipientOptionActive]}
                onPress={() => {
                    setRecipientType("manual");
                    setRecipientUserId(null);
                    setRecipientName("");
                    setRecipientPhone("");
                }}
            >
                <Text style={[styles.recipientOptionText, recipientType === "manual" && styles.recipientOptionTextActive]}>MANUAL ENTRY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.recipientOption, recipientType === "platform" && styles.recipientOptionActive]}
                onPress={() => setRecipientType("platform")}
            >
                <Text style={[styles.recipientOptionText, recipientType === "platform" && styles.recipientOptionTextActive]}>SELECT USER</Text>
            </TouchableOpacity>
          </View>

          {recipientType === "platform" ? (
            <View>
                <Input
                    placeholder="Search user by name or phone..."
                    value={userSearchQuery}
                    onChangeText={setUserSearchQuery}
                    editable={!calculating}
                    icon={searching ? <ActivityIndicator size="small" color={THEME.colors.primary} /> : <Search color={THEME.colors.primary} size={20} />}
                />
                {searchResults.length > 0 && (
                    <View style={{ marginTop: -10, marginBottom: 15, backgroundColor: THEME.colors.background, borderRadius: 10 }}>
                        {searchResults.map((user) => (
                            <TouchableOpacity key={user.id} style={styles.userSearchResult} onPress={() => selectUser(user)}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View>
                                        <Text style={styles.userName}>{user.name}</Text>
                                        <Text style={styles.userPhone}>{user.phone}</Text>
                                    </View>
                                    {recipientUserId === user.id && <Check color={THEME.colors.success} size={20} />}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
          ) : (
            <View>
                <Input
                    placeholder="Recipient Name"
                    value={recipientName}
                    onChangeText={setRecipientName}
                    editable={!calculating}
                    icon={<User color={THEME.colors.textLight} size={20} />}
                />
                <Input
                    placeholder="Recipient Phone"
                    value={recipientPhone}
                    onChangeText={setRecipientPhone}
                    editable={!calculating}
                    keyboardType="phone-pad"
                    icon={<Phone color={THEME.colors.textLight} size={20} />}
                />
            </View>
          )}
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
