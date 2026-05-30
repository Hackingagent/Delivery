import { Card } from "@/components/Card";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/(tabs)/activity.styles";
import { useRouter } from "expo-router";
import { Clock, MapPin, PackageCheck } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "@/lib/api";

export default function ActivityScreen() {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await apiRequest<any>("/user/delivery-requests", {
        auth: "user",
      });
      // The API returns a paginated object or direct array, assuming it has data based on index() implementation
      setDeliveries(response.data || response || []);
    } catch (error: any) {
      Alert.alert("Error", "Failed to load activities: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(amount).replace('XAF', '').trim() + ' FCFA';
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Recent Deliveries</Text>

        {loading ? (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" color={THEME.colors.primary} />
          </View>
        ) : deliveries.length === 0 ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={styles.dateText}>No activities found yet.</Text>
          </View>
        ) : (
          deliveries.map((delivery) => (
            <TouchableOpacity
              key={delivery.id}
              activeOpacity={0.8}
              onPress={() => {
                if (delivery.status === "delivered") {
                  router.push(`/receipts/${delivery.id}`);
                } else {
                  router.push(`/track/${delivery.id}`);
                }
              }}
            >
              <Card style={styles.activityCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.dateContainer}>
                    <Clock color={THEME.colors.textLight} size={16} />
                    <Text style={styles.dateText}>{formatDate(delivery.created_at)}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 14, fontWeight: "800", color: THEME.colors.primary }}>BAM-{delivery.id}</Text>
                    <Text
                      style={[
                        styles.priceText,
                        delivery.status === "cancelled" &&
                          styles.priceTextCancelled,
                      ]}
                    >
                      {formatCurrency(delivery.fare)}
                    </Text>
                  </View>
                </View>

                <View style={styles.routeContainer}>
                  <View style={styles.routeItem}>
                    <MapPin color={THEME.colors.textMuted} size={16} />
                    <Text style={styles.routeText}>{delivery.pickup_location}</Text>
                  </View>
                  <View style={styles.routeItem}>
                    <PackageCheck
                      color={
                        delivery.status === "delivered"
                          ? THEME.colors.success
                          : delivery.status === "cancelled"
                          ? THEME.colors.error
                          : THEME.colors.primary
                      }
                      size={16}
                    />
                    <Text style={styles.routeText}>{delivery.dropoff_location}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    delivery.status === "cancelled" && styles.statusBadgeError,
                    (delivery.status === "pending" || delivery.status === "assigned" || delivery.status === "in_transit") && {
                      backgroundColor: THEME.colors.primary + "15",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      delivery.status === "cancelled" && styles.statusTextError,
                      (delivery.status === "pending" || delivery.status === "assigned" || delivery.status === "in_transit") && {
                        color: THEME.colors.primary,
                      },
                    ]}
                  >
                    {delivery.status}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
