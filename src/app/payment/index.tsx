import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/delivery-request/styles";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Banknote,
  Building,
  CheckCircle2,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"momo" | "om" | "cash">(
    "momo",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", padding: 24, alignItems: "center" },
        ]}
      >
        <CheckCircle2
          color={THEME.colors.success}
          size={84}
          style={{ marginBottom: 24 }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: THEME.colors.text,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Payment Successful!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: THEME.colors.textLight,
            textAlign: "center",
            marginBottom: 32,
            lineHeight: 22,
          }}
        >
          Your delivery request has been placed. You can now use your tracking
          number to see your parcel's live location.
        </Text>

        <View
          style={{
            backgroundColor: THEME.colors.surface,
            padding: 24,
            borderRadius: 16,
            width: "100%",
            alignItems: "center",
            marginBottom: 40,
            ...THEME.shadows.medium,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: THEME.colors.textMuted,
              marginBottom: 6,
              fontWeight: "500",
            }}
          >
            Tracking ID
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: THEME.colors.primary,
              letterSpacing: 1.5,
            }}
          >
            BAM-TX9204A
          </Text>
        </View>

        <Button
          title="Track Package Now"
          onPress={() => router.replace("/track/BAM-TX9204A")}
          style={{ width: "100%", marginBottom: 16 }}
        />
        <Button
          title="Return to Dashboard"
          onPress={() => router.replace("/(tabs)/")}
          style={{
            width: "100%",
            backgroundColor: THEME.colors.background,
            borderWidth: 1,
            borderColor: THEME.colors.border,
          }}
          textStyle={{ color: THEME.colors.text }}
        />
      </View>
    );
  }

  const PAYMENT_METHODS = [
    {
      id: "momo",
      title: "MTN Mobile Money",
      subtitle: "Pay instantly via MTN",
      icon: <Building color="#FFCC00" size={24} />,
    },
    {
      id: "om",
      title: "Orange Money",
      subtitle: "Pay securely via Orange",
      icon: <Banknote color="#FF6600" size={24} />,
    },
    {
      id: "cash",
      title: "Cash on Delivery",
      subtitle: "Pay when package arrives",
      icon: <Banknote color={THEME.colors.success} size={24} />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total to Pay</Text>
          <Text style={styles.amountValue}>1,500 FCFA</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        <View style={styles.methodsList}>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  isSelected && styles.methodCardSelected,
                ]}
                onPress={() => setSelectedMethod(method.id as any)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    isSelected && styles.iconContainerSelected,
                  ]}
                >
                  {method.icon}
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>{method.title}</Text>
                  <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                </View>
                <View style={styles.radioOutline}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Pay 1,500 FCFA securely`}
          icon={<CheckCircle2 color={THEME.colors.surface} size={20} />}
          loading={isProcessing}
          onPress={handlePayment}
        />
      </View>
    </View>
  );
}
