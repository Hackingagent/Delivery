import { THEME } from "@/constants/theme";
import { useAgentAuth } from "@/contexts/AgentAuthContext";
import { useRouter } from "expo-router";
import { ArrowRight, Clock, MapPin, Package } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "@/lib/api";

export default function AgentDashboardScreen() {
  const router = useRouter();
  const { agent } = useAgentAuth();
  const [isOnline, setIsOnline] = useState(agent?.status === 'online');
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await apiRequest<any>("/agent/deliveries", { auth: "agent" });
      setDeliveries(response.data || []);
    } catch (error: any) {
      Alert.alert("Error", "Failed to fetch deliveries: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDeliveries();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.statusHeader}>
          <View>
            <Text style={styles.greeting}>
              Hello, {agent?.name?.split(" ")[0] ?? "Courier"}!
            </Text>
            <Text style={styles.statusText}>
              {isOnline
                ? "You are online and seeking requests"
                : "You are currently offline"}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{
              false: THEME.colors.border,
              true: THEME.colors.secondary,
            }}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{deliveries.filter(d => d.status === 'delivered').length}</Text>
            <Text style={styles.statLabel}>Current Session</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.9★</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{(deliveries.filter(d => d.status === 'delivered').length * 1500).toLocaleString()}</Text>
            <Text style={styles.statLabel}>Earnings (FCFA)</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Active Tasks ({deliveries.length})</Text>

        {!isOnline ? (
          <View style={styles.offlineBox}>
            <Text style={styles.offlineText}>
              Go online to see pending requests.
            </Text>
          </View>
        ) : loading ? (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" color={THEME.colors.primary} />
          </View>
        ) : deliveries.length === 0 ? (
          <View style={styles.offlineBox}>
            <Text style={styles.offlineText}>
              No active tasks assigned to you.
            </Text>
          </View>
        ) : (
          deliveries.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              activeOpacity={0.8}
              onPress={() => router.push(`/task/${task.id}`)}
            >
              <View style={styles.taskHeader}>
                <View style={styles.tagBox}>
                  <Package color={THEME.colors.primary} size={14} />
                  <Text style={styles.tagText}>{task.package_details}</Text>
                </View>
                <Text style={styles.payText}>{Number(task.fare).toLocaleString()} FCFA</Text>
              </View>

              <View style={styles.locationGroup}>
                <View style={styles.locationRow}>
                  <View style={styles.dotOrigin} />
                  <Text style={styles.locationText}>{task.pickup_location}</Text>
                </View>
                <View style={styles.locationLine} />
                <View style={styles.locationRow}>
                  <View style={styles.dotDest} />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {task.dropoff_location}
                  </Text>
                </View>
              </View>

              <View style={styles.taskFooter}>
                <View style={[styles.statusBadge, { 
                  backgroundColor: task.status === 'in_transit' ? THEME.colors.primary + '20' : THEME.colors.secondary + '20'
                }]}>
                  <Text style={[styles.statusTextBadge, { 
                    color: task.status === 'in_transit' ? THEME.colors.primary : THEME.colors.secondary
                  }]}>
                    {task.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
                <ArrowRight color={THEME.colors.secondary} size={20} />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacingLg,
    ...THEME.shadows.small,
  },
  greeting: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  statusText: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: THEME.sizes.spacingXl,
  },
  statBox: {
    flex: 1,
    backgroundColor: THEME.colors.surface,
    paddingVertical: THEME.sizes.spacing,
    borderRadius: THEME.sizes.radiusMd,
    alignItems: "center",
    marginHorizontal: 4,
    ...THEME.shadows.small,
  },
  statValue: {
    fontSize: THEME.sizes.lg,
    fontWeight: "800",
    color: THEME.colors.secondary,
  },
  statLabel: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTextBadge: {
    fontSize: 10,
    fontWeight: "800",
  },
  sectionTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacing,
  },
  offlineBox: {
    padding: THEME.sizes.spacingXl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: THEME.colors.border,
  },
  offlineText: {
    color: THEME.colors.textMuted,
    fontWeight: "600",
  },
  taskCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    padding: THEME.sizes.spacingLg,
    marginBottom: THEME.sizes.spacing,
    ...THEME.shadows.small,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingLg,
  },
  tagBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.primary + "1A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  tagText: {
    fontSize: THEME.sizes.xs,
    fontWeight: "700",
    color: THEME.colors.primary,
    textTransform: "uppercase",
  },
  payText: {
    fontSize: THEME.sizes.md,
    fontWeight: "800",
    color: THEME.colors.success,
  },
  locationGroup: {
    marginBottom: THEME.sizes.spacingLg,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotOrigin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.colors.primary,
    marginRight: 12,
  },
  dotDest: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: THEME.colors.secondary,
    marginRight: 12,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: THEME.colors.borderLight,
    marginLeft: 5,
    marginVertical: 2,
  },
  locationText: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
    fontWeight: "500",
    flex: 1,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
    paddingTop: THEME.sizes.spacing,
  },
  footerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textMuted,
  },
});
