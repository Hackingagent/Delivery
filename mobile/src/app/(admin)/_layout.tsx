import { THEME } from "@/constants/theme";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Tabs, useRouter } from "expo-router";
import { BarChart3, Menu, PackageOpen, Users } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator, Platform, TouchableOpacity, View } from "react-native";

export default function AdminLayout() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/admin-login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: THEME.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: THEME.colors.primary,
        },
        headerTintColor: THEME.colors.surface,
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push("/admin-menu")}
            style={{ paddingHorizontal: 16 }}
          >
            <Menu color={THEME.colors.surface} size={24} />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 28 : 8,
          height: Platform.OS === "ios" ? 88 : 68,
          backgroundColor: THEME.colors.surface,
          borderTopColor: THEME.colors.borderLight,
        },
        tabBarActiveTintColor: THEME.colors.primary,
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
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="agents"
        options={{
          title: "Couriers",
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "All Orders",
          tabBarIcon: ({ color, size }) => (
            <PackageOpen color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="agent-form"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
