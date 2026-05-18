import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Lock, Mail, Phone, User } from "lucide-react-native";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { styles } from "./_signup.styles";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Bamenda Delivery today</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            autoCapitalize="words"
            icon={<User color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Phone Number"
            placeholder="+237 XXXXXXXX"
            keyboardType="phone-pad"
            icon={<Phone color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Email Address"
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Mail color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            icon={<Lock color={THEME.colors.textMuted} size={20} />}
          />

          <Button
            title="Create Account"
            onPress={() => router.replace("/(tabs)/")}
            style={styles.submitButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Button title="Sign In" type="text" onPress={() => router.back()} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
