import { THEME } from "@/constants/theme";
import { useAgentAuth } from "@/contexts/AgentAuthContext";
import { useRouter } from "expo-router";
import { ArrowRight, Clock, MapPin, Package } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentDashboardScreen() {
  const router = useRouter();
  const { agent } = useAgentAuth();
  const [isOnline, setIsOnline] = useState(true);

  const pendingTasks = [
    {
      id: "BAM-1042",
      type: "Food",
      from: "Commercial Avenue",
      to: "Nkwen",
      time: "ASAP",
      distance: "4.2 km",
      pay: "1,500 FCFA",
    },
    {
      id: "BAM-1088",
      type: "Document",
      from: "Hospital Roundabout",
      to: "Up Station",
      time: "by 2:00 PM",
      distance: "2.1 km",
      pay: "800 FCFA",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.9★</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>22k</Text>
            <Text style={styles.statLabel}>Earned (FCFA)</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Tasks (2)</Text>

        {!isOnline ? (
          <View style={styles.offlineBox}>
            <Text style={styles.offlineText}>
              Go online to see pending requests.
            </Text>
          </View>
        ) : (
          pendingTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              activeOpacity={0.8}
              onPress={() => router.push(`/task/${task.id}`)}
            >
              <View style={styles.taskHeader}>
                <View style={styles.tagBox}>
                  <Package color={THEME.colors.primary} size={14} />
                  <Text style={styles.tagText}>{task.type}</Text>
                </View>
                <Text style={styles.payText}>{task.pay}</Text>
              </View>

              <View style={styles.locationGroup}>
                <View style={styles.locationRow}>
                  <View style={styles.dotOrigin} />
                  <Text style={styles.locationText}>{task.from}</Text>
                </View>
                <View style={styles.locationLine} />
                <View style={styles.locationRow}>
                  <View style={styles.dotDest} />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {task.to}
                  </Text>
                </View>
              </View>

              <View style={styles.taskFooter}>
                <View style={styles.footerInfo}>
                  <Clock color={THEME.colors.textMuted} size={14} />
                  <Text style={styles.footerText}>{task.time}</Text>
                  <MapPin
                    color={THEME.colors.textMuted}
                    size={14}
                    style={{ marginLeft: 12 }}
                  />
                  <Text style={styles.footerText}>{task.distance}</Text>
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
    paddingVertical: THEME.sizes.spacingMd,
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
    paddingTop: THEME.sizes.spacingMd,
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
