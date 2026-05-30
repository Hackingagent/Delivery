import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "@/styles/(auth)/login.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      // Wait a bit to ensure context updates
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 100);
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
            icon={<Mail color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
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
            title={isLoading ? "Signing In..." : "Sign In"}
            onPress={handleLogin}
            disabled={isLoading}
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

          <View style={[styles.registerContainer, { marginTop: 40 }]}>
            <Button
              title="Admin Portal"
              type="text"
              textStyle={{ fontWeight: "700" }}
              onPress={() => router.push("/(auth)/admin-login")}
            />
            <Text style={styles.registerText}> | </Text>
            <Button
              title="Agent Portal"
              type="text"
              textStyle={{ fontWeight: "700" }}
              onPress={() => router.push("/(auth)/agent-login")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
