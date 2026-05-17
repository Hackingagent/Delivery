import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Banknote,
    MapPin,
    Navigation,
    Package,
} from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";

export default function DeliveryRequestScreen() {
  const router = useRouter();
  const [calculating, setCalculating] = useState(false);

  const handleConfirm = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      router.push("/payment/");
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              icon={<MapPin color={THEME.colors.primary} size={20} />}
            />
            <Input
              placeholder="Drop-off Destination (e.g., Nkwen)"
              icon={<Navigation color={THEME.colors.success} size={20} />}
              style={styles.destinationInput}
            />
          </View>
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Package Information</Text>
          <Input
            placeholder="What are we delivering?"
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
