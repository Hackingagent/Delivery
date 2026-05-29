import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AgentAuthProvider } from "@/contexts/AgentAuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AdminAuthProvider>
      <AgentAuthProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="(agent)" options={{ headerShown: false }} />
        <Stack.Screen
          name="menu"
          options={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="admin-menu"
          options={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
        </Stack>
      </AgentAuthProvider>
    </AdminAuthProvider>
  );
}
