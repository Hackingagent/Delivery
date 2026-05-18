import { Card } from "@/components/Card";
import { THEME } from "@/constants/theme";
import { Clock, MapPin, PackageCheck } from "lucide-react-native";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "./_activity.styles";

export default function ActivityScreen() {
  const pastDeliveries = [
    {
      id: 1,
      date: "Today, 2:30 PM",
      status: "Delivered",
      price: "1,500 FCFA",
      from: "Commercial Avenue",
      to: "Nkwen",
    },
    {
      id: 2,
      date: "Yesterday, 10:15 AM",
      status: "Delivered",
      price: "2,000 FCFA",
      from: "Bambili",
      to: "Up Station",
    },
    {
      id: 3,
      date: "May 14, 4:00 PM",
      status: "Cancelled",
      price: "0 FCFA",
      from: "Hospital Roundabout",
      to: "Mile 90",
    },
  ];

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

        {pastDeliveries.map((delivery) => (
          <Card key={delivery.id} style={styles.activityCard}>
            <View style={styles.cardHeader}>
              <View style={styles.dateContainer}>
                <Clock color={THEME.colors.textLight} size={16} />
                <Text style={styles.dateText}>{delivery.date}</Text>
              </View>
              <Text
                style={[
                  styles.priceText,
                  delivery.status === "Cancelled" && styles.priceTextCancelled,
                ]}
              >
                {delivery.price}
              </Text>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routeItem}>
                <MapPin color={THEME.colors.textMuted} size={16} />
                <Text style={styles.routeText}>{delivery.from}</Text>
              </View>
              <View style={styles.routeItem}>
                <PackageCheck
                  color={
                    delivery.status === "Delivered"
                      ? THEME.colors.success
                      : THEME.colors.error
                  }
                  size={16}
                />
                <Text style={styles.routeText}>{delivery.to}</Text>
              </View>
            </View>

            <View
              style={[
                styles.statusBadge,
                delivery.status === "Cancelled" && styles.statusBadgeError,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  delivery.status === "Cancelled" && styles.statusTextError,
                ]}
              >
                {delivery.status}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
