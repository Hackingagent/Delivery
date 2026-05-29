import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ApiError } from "@/lib/api";
import { styles } from "@/styles/(auth)/login.styles";
import { useRouter } from "expo-router";
import { Lock, Mail, ShieldAlert } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function AdminLoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAdminAuth();

  const [email, setEmail] = useState("admin@bamenda.cm");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/(admin)/");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleLogin = async () => {
    setError(null);

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace("/(admin)/");
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
      style={[styles.container, { backgroundColor: "#0A0F1C" }]}
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
            style={[
              styles.logoContainer,
              { marginBottom: THEME.sizes.spacingLg },
            ]}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                backgroundColor: THEME.colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ShieldAlert color={THEME.colors.surface} size={40} />
            </View>
          </View>
          <Text
            style={[
              styles.title,
              { color: THEME.colors.surface, fontSize: 32 },
            ]}
          >
            Control Center
          </Text>
          <Text style={[styles.subtitle, { color: THEME.colors.textMuted }]}>
            Restricted Access. Admins only.
          </Text>
        </View>

        <View
          style={[
            styles.formContainer,
            { backgroundColor: "#1A2235", padding: 24, borderRadius: 24 },
          ]}
        >
          <Input
            label="Admin Email"
            placeholder="admin@bamenda.cm"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            icon={<Mail color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Master Password"
            placeholder="Enter secure password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon={<Lock color={THEME.colors.textMuted} size={20} />}
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
            title="Authorize Access"
            loading={loading}
            onPress={handleLogin}
            style={{ marginTop: 24, backgroundColor: THEME.colors.primary }}
          />

          <View
            style={[
              styles.registerContainer,
              { marginTop: 60, paddingBottom: 20 },
            ]}
          >
            <Button
              title="Return to Customer Login"
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
