import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { Edit3, Phone, Circle, User, UserPlus } from "lucide-react-native";
import { deleteAgent, fetchAgents } from "@/lib/agentsApi";
import type { Agent } from "@/types/admin";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function statusColor(status: Agent["status"]) {
  switch (status) {
    case "online":
      return THEME.colors.success;
    case "in_transit":
      return THEME.colors.primary;
    default:
      return THEME.colors.textMuted;
  }
}

export default function AdminAgentsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAgents = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchAgents(filter);
      setAgents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load agents.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      loadAgents();
    }, [loadAgents]),
  );

  const handleDelete = (agent: Agent) => {
    Alert.alert(
      "Remove agent",
      `Delete ${agent.name} from the fleet?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAgent(agent.id);
              setExpandedId(null);
              loadAgents(true);
            } catch (err) {
              Alert.alert(
                "Error",
                err instanceof Error ? err.message : "Could not delete agent.",
              );
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadAgents(true)}
            tintColor={THEME.colors.primary}
          />
        }
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionTitle}>Fleet Management</Text>
            <Text style={styles.countText}>{agents.length} Total Couriers</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              router.push({
                pathname: "/(admin)/agent-form",
              })
            }
          >
            <UserPlus color={THEME.colors.surface} size={24} />
          </TouchableOpacity>
        </View>

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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading && !refreshing ? (
          <Text style={styles.emptyText}>Loading couriers...</Text>
        ) : null}

        {!loading && agents.length === 0 ? (
          <Text style={styles.emptyText}>
            No couriers found. Tap + to add one.
          </Text>
        ) : null}

        {agents.map((agent) => {
          const iconColor = statusColor(agent.status);

          return (
            <TouchableOpacity
              key={agent.id}
              activeOpacity={0.9}
              onPress={() =>
                setExpandedId(expandedId === agent.id ? null : agent.id)
              }
              style={[
                styles.agentCard,
                expandedId === agent.id && {
                  borderColor: iconColor,
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
                    <Circle color={iconColor} size={10} />
                    <Text style={styles.statusText}>{agent.status_label}</Text>
                    <Text style={styles.licenseText}>
                      {" "}
                      • {agent.license_id}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.callBtn}>
                  <Phone color={THEME.colors.primary} size={20} />
                </TouchableOpacity>
              </View>

              {expandedId === agent.id && (
                <View style={styles.expandedSection}>
                  <View style={styles.divider} />
                  <Text style={styles.detailLabel}>Contact</Text>
                  <Text style={styles.detailValue}>{agent.phone}</Text>
                  {agent.base_zone ? (
                    <>
                      <Text style={[styles.detailLabel, { marginTop: 8 }]}>
                        Base zone
                      </Text>
                      <Text style={styles.detailValue}>{agent.base_zone}</Text>
                    </>
                  ) : null}
                  {agent.vehicle_plate ? (
                    <>
                      <Text style={[styles.detailLabel, { marginTop: 8 }]}>
                        Vehicle
                      </Text>
                      <Text style={styles.detailValue}>
                        {agent.vehicle_plate}
                      </Text>
                    </>
                  ) : null}

                  <View style={styles.actionGrid}>
                    <Button
                      title="Edit Profile"
                      icon={<Edit3 color={THEME.colors.surface} size={16} />}
                      style={{
                        flex: 1,
                        backgroundColor: THEME.colors.secondary,
                        paddingVertical: 10,
                      }}
                      textStyle={{ fontSize: 13 }}
                      onPress={() =>
                        router.push({
                          pathname: "/(admin)/agent-form",
                          params: { id: String(agent.id) },
                        })
                      }
                    />
                    <Button
                      title="Remove"
                      style={{
                        flex: 1,
                        backgroundColor: THEME.colors.error,
                        paddingVertical: 10,
                      }}
                      textStyle={{ fontSize: 13 }}
                      onPress={() => handleDelete(agent)}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
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
  addButton: {
    backgroundColor: THEME.colors.primary,
    padding: 10,
    borderRadius: 12,
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
    flexWrap: "wrap",
  },
  statusText: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
    fontWeight: "700",
    marginLeft: 6,
  },
  licenseText: {
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
  },
  detailValue: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.text,
    marginTop: 4,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: THEME.sizes.spacingLg,
  },
  errorText: {
    color: THEME.colors.error,
    marginBottom: THEME.sizes.spacing,
  },
  emptyText: {
    textAlign: "center",
    color: THEME.colors.textMuted,
    marginTop: THEME.sizes.spacingXl,
  },
});
