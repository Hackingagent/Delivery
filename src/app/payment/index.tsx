import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
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
import { styles } from "./_styles";

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"momo" | "om" | "cash">(
    "momo",
  );

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
          onPress={() => router.replace("/(tabs)/")} // Mock returning to dashboard
        />
      </View>
    </View>
  );
}
