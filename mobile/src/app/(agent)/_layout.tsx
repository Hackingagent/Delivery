import { THEME } from "@/constants/theme";
import { Tabs, useRouter } from "expo-router";
import {
  ArrowLeft,
  Banknote,
  BriefcaseBusiness,
  Settings,
} from "lucide-react-native";
import { Platform, TouchableOpacity } from "react-native";

export default function AgentLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: THEME.colors.secondary, // Dark header for agents
        },
        headerTintColor: THEME.colors.surface,
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login")}
            style={{ paddingHorizontal: 16 }}
          >
            <ArrowLeft color={THEME.colors.surface} size={24} />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 28 : 8,
          height: Platform.OS === "ios" ? 88 : 68,
          backgroundColor: THEME.colors.surface,
          borderTopColor: THEME.colors.borderLight,
        },
        tabBarActiveTintColor: THEME.colors.secondary,
        tabBarInactiveTintColor: THEME.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Deliveries",
          tabBarIcon: ({ color, size }) => (
            <BriefcaseBusiness color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color, size }) => (
            <Banknote color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Agent Profile",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="task/[id]"
        options={{
          href: null,
          title: "Task Details",
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          href: null,
          title: "Package Proof",
          headerShown: false,
          tabBarStyle: { display: "none" }, // Hide tab bar when using camera
        }}
      />
    </Tabs>
  );
}
