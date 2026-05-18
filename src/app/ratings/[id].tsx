import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ArrowLeft, CheckCircle, Star } from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./_styles";

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      router.replace("/(tabs)/");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          {!submitted && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft color={THEME.colors.text} size={24} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {submitted ? (
            <View style={styles.successContainer}>
              <CheckCircle color={THEME.colors.success} size={80} />
              <Text style={styles.successTitle}>Thank You!</Text>
              <Text style={styles.successSubtitle}>
                Your feedback helps Bamenda Delivery improve its services.
              </Text>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.title}>How was your delivery?</Text>
              <Text style={styles.subtitle}>
                Rate your experience with driver John Doe
              </Text>

              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    activeOpacity={0.7}
                  >
                    <Star
                      color={
                        star <= rating
                          ? THEME.colors.warning
                          : THEME.colors.border
                      }
                      fill={
                        star <= rating ? THEME.colors.warning : "transparent"
                      }
                      size={48}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Leave a comment (optional)</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={4}
                placeholder="He was very fast and polite..."
                value={comment}
                onChangeText={setComment}
                placeholderTextColor={THEME.colors.textMuted}
                textAlignVertical="top"
              />
            </View>
          )}
        </ScrollView>

        {!submitted && (
          <View style={styles.footer}>
            <Button
              title="Submit Feedback"
              disabled={rating === 0}
              onPress={handleSubmit}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
