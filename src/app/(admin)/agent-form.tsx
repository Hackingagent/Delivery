import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ArrowLeft, Hash, MapPin, Phone, User } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentFormScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ArrowLeft color={THEME.colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Agent Profile</Text>
        </View>

        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <User color={THEME.colors.surface} size={40} />
          </View>
          <Button
            title="Upload Photo"
            type="text"
            textStyle={{ color: THEME.colors.primary, marginTop: 8 }}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <Input
            label="Full Name"
            placeholder="E.g., John Doe"
            icon={<User color={THEME.colors.textMuted} size={20} />}
          />
          <Input
            label="Phone Number"
            placeholder="+237 6..."
            keyboardType="phone-pad"
            icon={<Phone color={THEME.colors.textMuted} size={20} />}
          />
          <Input
            label="Base Zone"
            placeholder="E.g., Nkwen, Up Station"
            icon={<MapPin color={THEME.colors.textMuted} size={20} />}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionHeader}>Vehicle & License</Text>
          <Input
            label="Vehicle License Plate"
            placeholder="E.g., NW 1234 A"
            icon={<Hash color={THEME.colors.textMuted} size={20} />}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Save Agent Profile"
          style={{ backgroundColor: THEME.colors.primary }}
          onPress={() => {
            // Mock Save operation
            router.back();
          }}
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
  scrollContent: {
    padding: THEME.sizes.spacingLg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingXl,
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
  photoContainer: {
    alignItems: "center",
    marginBottom: THEME.sizes.spacingXl,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.textMuted + "40",
    justifyContent: "center",
    alignItems: "center",
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
});
