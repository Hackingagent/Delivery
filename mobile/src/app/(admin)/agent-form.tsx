import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { ApiError } from "@/lib/api";
import {
  createAgent,
  fetchAgent,
  updateAgent,
} from "@/lib/agentsApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Hash, KeySquare, MapPin, Phone, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [baseZone, setBaseZone] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing || !id) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const agent = await fetchAgent(Number(id));
        setName(agent.name);
        setPhone(agent.phone);
        setBaseZone(agent.base_zone ?? "");
        setVehiclePlate(agent.vehicle_plate ?? "");
        setLicenseId(agent.license_id);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load agent profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, isEditing]);

  const handleSave = async () => {
    setError(null);

    if (!name.trim() || !phone.trim()) {
      setError("Name and phone number are required.");
      return;
    }

    if (!isEditing && pin.length !== 4) {
      setError("Agent PIN must be exactly 4 digits.");
      return;
    }

    if (isEditing && pin.length > 0 && pin.length !== 4) {
      setError("PIN must be exactly 4 digits when provided.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        base_zone: baseZone.trim() || undefined,
        vehicle_plate: vehiclePlate.trim() || undefined,
        ...(pin ? { pin } : {}),
      };

      if (isEditing && id) {
        await updateAgent(Number(id), payload);
      } else {
        await createAgent({ ...payload, pin });
      }

      router.back();
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Could not save agent.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ArrowLeft color={THEME.colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>
            {isEditing ? "Edit Courier" : "New Courier"}
          </Text>
        </View>

        {isEditing && licenseId ? (
          <Text style={styles.licenseBadge}>License: {licenseId}</Text>
        ) : null}

        <View style={styles.formSection}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <Input
            label="Full Name"
            placeholder="E.g., John Doe"
            value={name}
            onChangeText={setName}
            icon={<User color={THEME.colors.textMuted} size={20} />}
          />
          <Input
            label="Phone Number"
            placeholder="+237 6..."
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            icon={<Phone color={THEME.colors.textMuted} size={20} />}
          />
          <Input
            label="Base Zone"
            placeholder="E.g., Nkwen, Up Station"
            value={baseZone}
            onChangeText={setBaseZone}
            icon={<MapPin color={THEME.colors.textMuted} size={20} />}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionHeader}>Vehicle & Access</Text>
          <Input
            label="Vehicle License Plate"
            placeholder="E.g., NW 1234 A"
            value={vehiclePlate}
            onChangeText={setVehiclePlate}
            icon={<Hash color={THEME.colors.textMuted} size={20} />}
          />
          <Input
            label={isEditing ? "New PIN (optional)" : "Agent PIN (4 digits)"}
            placeholder="1234"
            keyboardType="number-pad"
            secureTextEntry
            maxLength={4}
            value={pin}
            onChangeText={setPin}
            icon={<KeySquare color={THEME.colors.textMuted} size={20} />}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={isEditing ? "Update Courier" : "Save Courier"}
          loading={saving}
          style={{ backgroundColor: THEME.colors.primary }}
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingLg,
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  licenseBadge: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.primary,
    fontWeight: "700",
    marginBottom: THEME.sizes.spacingLg,
  },
  formSection: {
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacingLg,
    ...THEME.shadows.small,
  },
  sectionHeader: {
    fontSize: THEME.sizes.sm,
    fontWeight: "700",
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: THEME.sizes.spacingLg,
  },
  footer: {
    padding: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
  },
  errorText: {
    color: THEME.colors.error,
    textAlign: "center",
    marginTop: 8,
  },
});
