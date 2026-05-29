import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/(auth)/login.styles";
import { useRouter } from "expo-router";
import { KeySquare, Navigation, Phone } from "lucide-react-native";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function AgentLoginScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: THEME.colors.secondary }]} // Dark/Green theme for agents
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
            icon={<Phone color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Agent PIN"
            placeholder="4-digit dispatch PIN"
            secureTextEntry
            keyboardType="numeric"
            icon={<KeySquare color={THEME.colors.textMuted} size={20} />}
          />

          <Button
            title="Start Shift"
            onPress={() => router.replace("/(agent)/")}
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
