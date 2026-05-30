import { THEME } from "@/constants/theme";
import {
    ArrowUpRight,
    Calendar,
    Package,
    Users,
    Clock,
} from "lucide-react-native";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";

export default function AdminDashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = useCallback(async () => {
    try {
        const response = await apiRequest<any>("/admin/dashboard", { auth: "admin" });
        setData(response);
    } catch (error) {
        console.error("Fetch dashboard error:", error);
    } finally {
        setLoading(false);
        setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 60000); // 1 minute auto-refresh
    return () => clearInterval(interval);
  }, [fetchDashboard]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  if (loading && !data) {
    return (
        <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
            <ActivityIndicator size="large" color={THEME.colors.primary} />
        </View>
    );
  }

  const { stats, weekly_revenue, recent_activities } = data || { 
    stats: { total_revenue: 0, online_agents: 0, completed_today: 0 },
    weekly_revenue: [],
    recent_activities: []
  };

  // Find max revenue for chart scaling
  const maxRevenue = Math.max(...weekly_revenue.map((w: any) => w.revenue), 1000);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerFlex}>
          <View>
            <Text style={styles.pageTitle}>Overview</Text>
            <Text style={styles.dateSubtitle}>Live System Status</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={onRefresh}>
            <Calendar color={THEME.colors.primary} size={18} />
            <Text style={styles.filterText}>Sync Data</Text>
          </TouchableOpacity>
        </View>

        {/* Spectacular Financial Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Total Revenue</Text>
              <Text style={styles.chartValue}>{Number(stats.total_revenue).toLocaleString()} FCFA</Text>
            </View>
            <View style={styles.growthBadge}>
              <ArrowUpRight color={THEME.colors.success} size={16} />
              <Text style={styles.growthText}>Live</Text>
            </View>
          </View>

          {/* Custom Native Bar Chart */}
          <View style={styles.chartGraph}>
            {weekly_revenue.map((item: any, index: number) => {
              const heightPercentage = Math.max((item.revenue / maxRevenue) * 100, 5);
              return (
                <View key={index} style={styles.barColumn}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${heightPercentage}%`,
                        backgroundColor:
                          index === weekly_revenue.length - 1
                            ? THEME.colors.primary
                            : THEME.colors.primary + "40",
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.barLabel,
                      index === weekly_revenue.length - 1 && {
                        color: THEME.colors.text,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick KPIs</Text>

        <View style={styles.grid}>
          <View style={styles.statCard}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: THEME.colors.secondary + "1A" },
              ]}
            >
              <Users color={THEME.colors.secondary} size={24} />
            </View>
            <Text style={styles.statValue}>{stats.online_agents}</Text>
            <Text style={styles.statLabel}>Online Agents</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: THEME.colors.success + "1A" },
              ]}
            >
              <Package color={THEME.colors.success} size={24} />
            </View>
            <Text style={styles.statValue}>{stats.completed_today}</Text>
            <Text style={styles.statLabel}>Completed Today</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Global Live Feed</Text>

        <View style={styles.activityList}>
          {recent_activities.length === 0 ? (
            <Text style={{ textAlign: "center", color: THEME.colors.textMuted, padding: 20 }}>No recent activity.</Text>
          ) : (
            recent_activities.map((activity: any) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityDot, { 
                  backgroundColor: activity.status === 'delivered' ? THEME.colors.success : THEME.colors.primary 
                }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>
                    Order BAM-{activity.id}
                  </Text>
                  <Text style={styles.activitySubtitle}>
                    {activity.status.replace('_', ' ').toUpperCase()} • {activity.user_name}
                  </Text>
                </View>
                <Text style={styles.activityTime}>
                    {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            ))
          )}
        </View>
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
  headerFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingLg,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  dateSubtitle: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textLight,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.primary + "1A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterText: {
    color: THEME.colors.primary,
    fontWeight: "700",
    fontSize: THEME.sizes.sm,
  },
  chartCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    padding: THEME.sizes.spacingLg,
    marginBottom: THEME.sizes.spacingXl,
    ...THEME.shadows.medium,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: THEME.sizes.spacingXl,
  },
  chartTitle: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 26,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  growthBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.success + "20",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  growthText: {
    color: THEME.colors.success,
    fontWeight: "700",
    fontSize: THEME.sizes.xs,
  },
  chartGraph: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 140,
  },
  barColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    width: 30,
  },
  bar: {
    width: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textMuted,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: THEME.sizes.spacingXl,
  },
  statCard: {
    width: "48%",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    // Note: fixing spacingMd to spacingSm or avoiding it
    marginBottom: THEME.sizes.spacingSm || 16,
    ...THEME.shadows.small,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  statLabel: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textMuted,
    marginTop: 4,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    padding: THEME.sizes.spacingLg,
    ...THEME.shadows.small,
    marginBottom: 40,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingLg,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.primary,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
  },
  activitySubtitle: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
  },
  activityTime: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textMuted,
  },
});
