import { THEME } from "@/constants/theme";
import { styles } from "@/styles/settings.styles";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    Fingerprint,
    Languages,
    Moon,
    Shield,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkEnabled, setDarkEnabled] = useState(false);
  const [bioEnabled, setBioEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Bell
                color={THEME.colors.text}
                size={22}
                style={styles.iconMargin}
              />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              trackColor={{
                false: THEME.colors.border,
                true: THEME.colors.primary,
              }}
              thumbColor={THEME.colors.surface}
              onValueChange={setPushEnabled}
              value={pushEnabled}
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Moon
                color={THEME.colors.text}
                size={22}
                style={styles.iconMargin}
              />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{
                false: THEME.colors.border,
                true: THEME.colors.primary,
              }}
              thumbColor={THEME.colors.surface}
              onValueChange={setDarkEnabled}
              value={darkEnabled}
            />
          </View>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Languages
                color={THEME.colors.text}
                size={22}
                style={styles.iconMargin}
              />
              <Text style={styles.settingLabel}>Language</Text>
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.settingValue}>English (US)</Text>
              <ChevronRight color={THEME.colors.textLight} size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Security & Privacy</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Fingerprint
                color={THEME.colors.text}
                size={22}
                style={styles.iconMargin}
              />
              <Text style={styles.settingLabel}>Biometric Login</Text>
            </View>
            <Switch
              trackColor={{
                false: THEME.colors.border,
                true: THEME.colors.success,
              }}
              thumbColor={THEME.colors.surface}
              onValueChange={setBioEnabled}
              value={bioEnabled}
            />
          </View>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Shield
                color={THEME.colors.text}
                size={22}
                style={styles.iconMargin}
              />
              <Text style={styles.settingLabel}>Privacy Policy</Text>
            </View>
            <ChevronRight color={THEME.colors.textLight} size={20} />
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>
          Bamenda Delivery v1.0.0 (Build 42)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
