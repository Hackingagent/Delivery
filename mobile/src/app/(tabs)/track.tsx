import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/(tabs)/track.styles";
import { useRouter } from "expo-router";
import { Navigation, Package, Search } from "lucide-react-native";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackTabScreen() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState("");

  const handleTrack = () => {
    if (trackingCode.trim()) {
      router.push(`/track/${trackingCode}`);
    } else {
      router.push("/track/BAM-TX9204A"); // Mock fallback
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Package</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.illustrationContainer}>
          <View style={styles.circleBg}>
            <Navigation
              color={THEME.colors.primary}
              size={64}
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </View>
        </View>

        <Text style={styles.title}>Track your delivery</Text>
        <Text style={styles.subtitle}>
          Enter your Bamenda tracking ID to see live updates
        </Text>

        <View style={styles.inputContainer}>
          <Search color={THEME.colors.textMuted} size={20} />
          <TextInput
            style={styles.input}
            placeholder="e.g BAM-TX9204A"
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

        <Text style={styles.sectionTitle}>Recent Searches</Text>

        <TouchableOpacity
          style={styles.recentItem}
          onPress={() => router.push("/track/BAM-TX8101C")}
        >
          <View style={styles.recentIcon}>
            <ClockIcon color={THEME.colors.primary} size={16} />
          </View>
          <View style={styles.recentDetails}>
            <Text style={styles.recentCode}>BAM-TX8101C</Text>
            <Text style={styles.recentStatus}>Delivered</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Simple fallback icon
const ClockIcon = ({ color, size }: any) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: color,
    }}
  />
);
