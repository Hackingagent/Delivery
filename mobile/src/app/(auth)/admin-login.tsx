import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/(auth)/login.styles";
import { useRouter } from "expo-router";
import { Lock, Mail, ShieldAlert } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function AdminLoginScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: "#0A0F1C" }]} // Deep premium dark theme
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { alignItems: "stretch" },
        ]}
        showsVerticalScrollIndicator={false}
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
            icon={<Mail color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Master Password"
            placeholder="Enter secure password"
            secureTextEntry
            icon={<Lock color={THEME.colors.textMuted} size={20} />}
          />

          <Button
            title="Authorize Access"
            onPress={() => router.replace("/(admin)/")}
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
