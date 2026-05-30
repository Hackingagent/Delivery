import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { THEME } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "@/styles/(auth)/signup.styles";
import { useRouter } from "expo-router";
import { Lock, Mail, Phone, User as UserIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function SignupScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !phone || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, phone, email, password, password_confirmation: password });
      Alert.alert("Success", "Account created successfully.");
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message || "An error occurred.");
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Bamenda Delivery today</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            editable={!isLoading}
            icon={<UserIcon color={THEME.colors.textMuted} size={20} />}
          />

          <Input
            label="Phone Number"
            placeholder="+237 XXXXXXXX"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            editable={!isLoading}
            icon={<Phone color={THEME.colors.textMuted} size={20} />}
          />

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
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
            icon={<Lock color={THEME.colors.textMuted} size={20} />}
          />

          <Button
            title={isLoading ? "Creating Account..." : "Create Account"}
            onPress={handleSignup}
            disabled={isLoading}
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
