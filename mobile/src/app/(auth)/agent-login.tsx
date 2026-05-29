import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { useAgentAuth } from "@/contexts/AgentAuthContext";
import { ApiError } from "@/lib/api";
import { styles } from "@/styles/(auth)/login.styles";
import { useRouter } from "expo-router";
import { KeySquare, Navigation, Phone } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function AgentLoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAgentAuth();

  const [phone, setPhone] = useState("+237671000001");
  const [pin, setPin] = useState("1234");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: THEME.colors.secondary, justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={THEME.colors.surface} />
      </View>
    );
  }

  if (isAuthenticated) {
    router.replace("/(agent)/");
    return null;
  }

  const handleLogin = async () => {
    setError(null);

    if (!phone.trim() || pin.length !== 4) {
      setError("Phone number and 4-digit PIN are required.");
      return;
    }

    setLoading(true);
    try {
      await login(phone.trim(), pin);
      router.replace("/(agent)/");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Unable to sign in.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: THEME.colors.secondary }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { alignItems: "stretch" },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.header, { alignItems: "center" }]}>
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              backgroundColor: THEME.colors.surface,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Navigation color={THEME.colors.secondary} size={48} />
          </View>
          <Text
            style={[
              styles.title,
              { color: THEME.colors.surface, fontSize: 32 },
            ]}
          >
            Courier Login
          </Text>
          <Text style={[styles.subtitle, { color: "rgba(255,255,255,0.7)" }]}>
            Get online and start earning.
          </Text>
        </View>

        <View
          style={[
            styles.formContainer,
            {
              backgroundColor: THEME.colors.surface,
              padding: 24,
              borderRadius: 24,
              marginTop: 12,
            },
          ]}
        >
          <Input
            label="Agent Phone Number"
            placeholder="+237 6..."
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            icon={<Phone color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Agent PIN"
            placeholder="4-digit dispatch PIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={pin}
            onChangeText={setPin}
            icon={<KeySquare color={THEME.colors.textMuted} size={20} />}
          />

          {error ? (
            <Text
              style={{
                color: THEME.colors.error,
                marginTop: 8,
                fontSize: 14,
              }}
            >
              {error}
            </Text>
          ) : null}

          <Button
            title="Start Shift"
            loading={loading}
            onPress={handleLogin}
            style={{ marginTop: 24, backgroundColor: THEME.colors.secondary }}
          />

          <View
            style={[
              styles.registerContainer,
              { marginTop: 60, paddingBottom: 20 },
            ]}
          >
            <Button
              title="Not an agent? Back to User Login"
              type="text"
              textStyle={{ color: THEME.colors.textLight, fontSize: 16 }}
              onPress={() => router.replace("/(auth)/login")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
