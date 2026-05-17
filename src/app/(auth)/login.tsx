import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View
} from "react-native";
import { styles } from "./login.styles";

export default function LoginScreen() {
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
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[THEME.colors.primary, THEME.colors.primaryDark]}
              style={styles.logoShape}
            >
              <Text style={styles.logoText}>B</Text>
            </LinearGradient>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to Bamenda Delivery</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Email Address"
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Mail color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            icon={<Lock color={THEME.colors.textMuted} size={20} />}
          />

          <View style={styles.forgotPasswordContainer}>
            <Button
              title="Forgot Password?"
              type="text"
              textStyle={styles.forgotPasswordText}
            />
          </View>

          <Button
            title="Sign In"
            onPress={() => router.replace("/(tabs)/")}
            style={styles.submitButton}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <Button
              title="Sign Up"
              type="text"
              onPress={() => router.push("/(auth)/signup")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
