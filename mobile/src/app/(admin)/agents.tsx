import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import {
  CheckCircle2,
  Circle,
  Edit3,
  MapPin,
  Phone,
  User,
  UserPlus,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminAgentsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const agents = [
    {
      id: 1,
      name: "Jude Courier",
      status: "Online",
      tasks: 2,
      iconColor: THEME.colors.success,
      currentTask: "Awaiting Pickup",
    },
    {
      id: 2,
      name: "Martin Tabot",
      status: "In Transit",
      tasks: 1,
      iconColor: THEME.colors.primary,
      currentTask: "Dropping off BAM-1044",
    },
    {
      id: 3,
      name: "Alice B.",
      status: "Offline",
      tasks: 0,
      iconColor: THEME.colors.textMuted,
    },
  ];

  const displayAgents =
    filter === "All" ? agents : agents.filter((a) => a.status === filter);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionTitle}>Fleet Management</Text>
            <Text style={styles.countText}>{agents.length} Total Vehicles</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: THEME.colors.primary,
              padding: 10,
              borderRadius: 12,
            }}
            onPress={() => router.push("/(admin)/agent-form")}
          >
            <UserPlus color={THEME.colors.surface} size={24} />
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {["All", "Online", "In Transit", "Offline"].map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFilter(cat)}
              style={[
                styles.filterPill,
                filter === cat && styles.filterPillActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === cat && styles.filterTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {displayAgents.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            activeOpacity={0.9}
            onPress={() =>
              setExpandedId(expandedId === agent.id ? null : agent.id)
            }
            style={[
              styles.agentCard,
              expandedId === agent.id && {
                borderColor: agent.iconColor,
                borderWidth: 1,
              },
            ]}
          >
            <View style={styles.cardMain}>
              <View style={styles.avatar}>
                <User color={THEME.colors.surface} size={24} />
              </View>

              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{agent.name}</Text>
                <View style={styles.statusRow}>
                  <Circle
                    color={agent.iconColor}
                    fill={agent.iconColor}
                    size={10}
                  />
                  <Text style={styles.statusText}>{agent.status}</Text>
                  <Text style={styles.taskCount}> • {agent.tasks} Tasks</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.callBtn}>
                <Phone color={THEME.colors.primary} size={20} />
              </TouchableOpacity>
            </View>

            {/* Expanded Detailed Analytics view per agent */}
            {expandedId === agent.id && (
              <View style={styles.expandedSection}>
                <View style={styles.divider} />

                {agent.status !== "Offline" ? (
                  <>
                    <Text style={styles.detailLabel}>Current Objective</Text>
                    <View style={styles.objectiveBox}>
                      <MapPin color={THEME.colors.textMuted} size={16} />
                      <Text style={styles.objectiveText}>
                        {agent.currentTask}
                      </Text>
                    </View>

                    <View style={styles.actionGrid}>
                      <Button
                        title="Message Agent"
                        style={{
                          flex: 1,
                          backgroundColor: THEME.colors.primary,
                          paddingVertical: 10,
                        }}
                        textStyle={{ fontSize: 13 }}
                      />
                      <Button
                        title="Edit Profile"
                        icon={<Edit3 color={THEME.colors.surface} size={16} />}
                        style={{
                          flex: 1,
                          backgroundColor: THEME.colors.secondary,
                          paddingVertical: 10,
                        }}
                        textStyle={{ fontSize: 13 }}
                        onPress={() => router.push("/(admin)/agent-form")}
                      />
                    </View>
                  </>
                ) : (
                  <View style={styles.offlineBox}>
                    <CheckCircle2 color={THEME.colors.textMuted} size={24} />
                    <Text style={styles.offlineMsg}>
                      Agent ended shift. No active tasks.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
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
    paddingBottom: 60,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.sizes.spacing,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  countText: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textMuted,
    fontWeight: "600",
  },
  filterScroll: {
    flexGrow: 0,
    marginBottom: THEME.sizes.spacingLg,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  filterPillActive: {
    backgroundColor: THEME.colors.secondary,
    borderColor: THEME.colors.secondary,
  },
  filterText: {
    fontSize: THEME.sizes.sm,
    fontWeight: "600",
    color: THEME.colors.textMuted,
  },
  filterTextActive: {
    color: THEME.colors.surface,
  },
  agentCard: {
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacing,
    ...THEME.shadows.small,
  },
  cardMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: THEME.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: THEME.sizes.spacing,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: THEME.sizes.md,
    fontWeight: "800",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
    fontWeight: "700",
    marginLeft: 6,
  },
  taskCount: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textMuted,
  },
  callBtn: {
    padding: 12,
    backgroundColor: THEME.colors.primary + "1A",
    borderRadius: THEME.sizes.radiusMd,
  },
  expandedSection: {
    marginTop: THEME.sizes.spacing,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.borderLight,
    marginVertical: THEME.sizes.spacing,
  },
  detailLabel: {
    fontSize: THEME.sizes.xs,
    fontWeight: "700",
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  objectiveBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: THEME.sizes.spacingLg,
  },
  objectiveText: {
    fontSize: THEME.sizes.sm,
    fontWeight: "600",
    color: THEME.colors.primary,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 12,
  },
  offlineBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  offlineMsg: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
});
