import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/(tabs)/track.styles";
import { useRouter } from "expo-router";
import { Navigation, Package, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "@/lib/api";

export default function TrackTabScreen() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState("");
  const [recentDeliveries, setRecentDeliveries] = useState<any[]>([]);

  useEffect(() => {
    loadRecent();
  }, []);

  const loadRecent = async () => {
    try {
      const res = await apiRequest<any>("/delivery-requests", { auth: "user" });
      setRecentDeliveries((res.data || []).slice(0, 5));
    } catch (e) {
      // Not critical — silently fail
    }
  };

  // Strip 'BAM-' prefix if the user types it — we only pass the numeric ID to the API
  const extractNumericId = (code: string): string => {
    return code.replace(/^BAM-/i, "").trim();
  };

  const handleTrack = () => {
    const numericId = extractNumericId(trackingCode);
    if (numericId) {
      router.push(`/track/${numericId}`);
    } else {
      Alert.alert("Missing ID", "Please enter a valid tracking number (e.g. BAM-3 or just 3)");
    }
  };

  const statusColor = (status: string) => {
    if (status === "delivered") return THEME.colors.success;
    if (status === "in_transit") return THEME.colors.primary;
    return THEME.colors.secondary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Package</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.illustrationContainer}>
          <View style={styles.circleBg}>
            <Navigation color={THEME.colors.primary} size={64} style={{ transform: [{ rotate: "45deg" }] }} />
          </View>
        </View>

        <Text style={styles.title}>Track your delivery</Text>
        <Text style={styles.subtitle}>Enter your Bamenda tracking ID to see live updates</Text>

        <View style={styles.inputContainer}>
          <Search color={THEME.colors.textMuted} size={20} />
          <TextInput
            style={styles.input}
            placeholder="e.g BAM-3 or just 3"
            placeholderTextColor={THEME.colors.textMuted}
            value={trackingCode}
            onChangeText={setTrackingCode}
            autoCapitalize="characters"
          />
        </View>

        <Button
          title="Track Now"
          onPress={handleTrack}
          style={styles.trackBtn}
          icon={<Package color={THEME.colors.surface} size={20} />}
        />

        {recentDeliveries.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Your Recent Orders</Text>
            {recentDeliveries.map((d) => (
              <TouchableOpacity
                key={d.id}
                style={styles.recentItem}
                onPress={() => router.push(`/track/${d.id}`)}
              >
                <View style={styles.recentIcon}>
                  <Package color={THEME.colors.primary} size={16} />
                </View>
                <View style={styles.recentDetails}>
                  <Text style={styles.recentCode}>BAM-{d.id}</Text>
                  <Text style={[styles.recentStatus, { color: statusColor(d.status) }]}>
                    {d.status.replace("_", " ").toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
