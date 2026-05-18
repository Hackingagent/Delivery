import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import {
    Bell,
    ChevronRight,
    CreditCard,
    HelpCircle,
    LogOut,
    MapPin,
    User,
} from "lucide-react-native";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./_profile.styles";

export default function ProfileScreen() {
  const router = useRouter();

  const SETTINGS_OPTIONS = [
    {
      id: "payment",
      title: "Payment Methods",
      icon: <CreditCard color={THEME.colors.text} size={22} />,
    },
    {
      id: "addresses",
      title: "Saved Addresses",
      icon: <MapPin color={THEME.colors.text} size={22} />,
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <Bell color={THEME.colors.text} size={22} />,
    },
    {
      id: "support",
      title: "Help & Support",
      icon: <HelpCircle color={THEME.colors.text} size={22} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User color={THEME.colors.primary} size={40} />
          </View>
          <Text style={styles.userName}>Alice Bamenda</Text>
          <Text style={styles.userPhone}>+237 671234567</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Premium Member</Text>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          {SETTINGS_OPTIONS.map((option, index) => (
            <React.Fragment key={option.id}>
              <TouchableOpacity style={styles.settingRow}>
                <View style={styles.settingIcon}>{option.icon}</View>
                <Text style={styles.settingText}>{option.title}</Text>
                <ChevronRight color={THEME.colors.textMuted} size={20} />
              </TouchableOpacity>
              {index < SETTINGS_OPTIONS.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutRow}
          onPress={() => router.replace("/(auth)/login")}
        >
          <LogOut color={THEME.colors.error} size={22} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Bamenda Delivery v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
