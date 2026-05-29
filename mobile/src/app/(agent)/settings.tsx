import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { useAgentAuth } from "@/contexts/AgentAuthContext";
import { useRouter } from "expo-router";
import { Bell, LogOut, Shield, User } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentSettingsScreen() {
  const router = useRouter();
  const { agent, logout } = useAgentAuth();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <User color={THEME.colors.surface} size={40} />
          </View>
          <Text style={styles.name}>{agent?.name ?? "Courier"}</Text>
          <Text style={styles.license}>
            License ID: {agent?.license_id ?? "—"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Account Setup</Text>

        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <Shield color={THEME.colors.secondary} size={24} />
            <Text style={styles.settingText}>Change PIN</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingItem}>
            <Bell color={THEME.colors.secondary} size={24} />
            <Text style={styles.settingText}>Notification Preferences</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Logout"
          icon={<LogOut color={THEME.colors.error} size={20} />}
          style={styles.logoutBtn}
          textStyle={{ color: THEME.colors.error }}
          onPress={async () => {
            await logout();
            router.replace("/(auth)/agent-login");
          }}
        />
      </ScrollView>
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
  profileHeader: {
    alignItems: "center",
    marginVertical: THEME.sizes.spacingXl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: THEME.sizes.spacingMd,
  },
  name: {
    fontSize: THEME.sizes.xl,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  license: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.textLight,
    textTransform: "uppercase",
    marginBottom: THEME.sizes.spacingMd,
    marginLeft: 8,
  },
  settingsGroup: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    ...THEME.shadows.small,
    marginBottom: THEME.sizes.spacingXl * 1.5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: THEME.sizes.spacingLg,
  },
  settingText: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
    marginLeft: THEME.sizes.spacingMd,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.borderLight,
    marginLeft: 56,
  },
  logoutBtn: {
    backgroundColor: THEME.colors.error + "1A",
    marginBottom: THEME.sizes.spacingXl,
  },
});
