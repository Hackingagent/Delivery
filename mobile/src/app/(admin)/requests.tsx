import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { MapPin, PackageOpen, Users, X, Map } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "@/lib/api";

export default function AdminRequestsScreen() {
  const router = useRouter();
  const [activeRequest, setActiveRequest] = useState<number | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [requestsData, agentsData] = await Promise.all([
        apiRequest<any>("/admin/delivery-requests", { auth: "admin" }),
        apiRequest<any>("/admin/agents", { auth: "admin" }),
      ]);
      setRequests(requestsData.data || []);
      setAgents(agentsData.data || agentsData || []);
    } catch (error: any) {
      Alert.alert("Error", "Failed to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignAgent = async (agentId: number) => {
    if (!activeRequest) return;
    
    setAssigning(true);
    try {
      await apiRequest(`/admin/delivery-requests/${activeRequest}/assign`, {
        method: "POST",
        auth: "admin",
        body: JSON.stringify({ agent_id: agentId }),
      });
      Alert.alert("Success", "Agent assigned successfully.");
      setShowAgentModal(false);
      setActiveRequest(null);
      fetchData();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to assign agent.");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Global Queue</Text>
          <Text style={styles.subtitleText}>
            {requests.length} Active System Orders
          </Text>
        </View>

        {requests.length === 0 ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={styles.subtitleText}>No delivery requests found.</Text>
          </View>
        ) : (
          requests.map((req) => (
            <TouchableOpacity
              key={req.id}
              activeOpacity={0.9}
              style={[
                styles.requestCard,
                activeRequest === req.id && styles.activeCard,
              ]}
              onPress={() =>
                setActiveRequest(activeRequest === req.id ? null : req.id)
              }
            >
              <View style={styles.cardHeader}>
                <View style={styles.idBox}>
                  <PackageOpen color={THEME.colors.primary} size={16} />
                  <Text style={styles.idText}>BAM-{req.id}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    req.status === "delivered" && {
                      backgroundColor: THEME.colors.success + "20",
                    },
                    req.status === "assigned" && {
                      backgroundColor: THEME.colors.secondary + "20",
                    },
                    req.status === "pending" && {
                      backgroundColor: THEME.colors.error + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      req.status === "delivered" && {
                        color: THEME.colors.success,
                      },
                      req.status === "assigned" && {
                        color: THEME.colors.secondary,
                      },
                      req.status === "pending" && { color: THEME.colors.error },
                    ]}
                  >
                    {req.status}
                  </Text>
                </View>
              </View>

              <View style={styles.locationGroup}>
                <View style={styles.locationRow}>
                  <View style={styles.dotOrigin} />
                  <Text style={styles.locationText}>{req.pickup_location}</Text>
                </View>
                <View style={styles.locationLine} />
                <View style={styles.locationRow}>
                  <View style={styles.dotDest} />
                  <Text style={styles.locationText}>{req.dropoff_location}</Text>
                </View>
              </View>

              {/* EXPANDED INTERACTIVE MENU */}
              {activeRequest === req.id && (
                <View style={styles.expandedMenu}>
                  <View style={styles.divider} />
                  <Text style={styles.assignLabel}>Admin Controls</Text>

                  {req.status === "pending" ? (
                    <View style={styles.actionGrid}>
                      <Button
                        title="Assign Agent"
                        icon={<Users color={THEME.colors.surface} size={18} />}
                        style={{
                          flex: 1,
                          backgroundColor: THEME.colors.primary,
                          paddingVertical: 12,
                        }}
                        textStyle={{ fontSize: 14 }}
                        onPress={() => setShowAgentModal(true)}
                      />
                    </View>
                  ) : (
                    <View style={styles.actionGrid}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.assignLabel}>Assigned Agent</Text>
                        <Text style={styles.locationText}>
                          {req.agent?.name || "Unknown Agent"}
                        </Text>
                      </View>
                      <Button
                        title="Track"
                        style={{
                          flex: 0.5,
                          backgroundColor: THEME.colors.secondary,
                          paddingVertical: 12,
                        }}
                        textStyle={{ fontSize: 14 }}
                        onPress={() => router.push(`/track/${req.id}`)}
                      />
                    </View>
                  )}
                </View>
              )}

              {!activeRequest || activeRequest !== req.id ? (
                <View style={styles.cardFooter}>
                  <Text style={styles.typeText}>{req.package_details}</Text>
                  <Text style={styles.tapText}>Tap to manage</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Agent Selection Modal */}
      <Modal
        visible={showAgentModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Agent</Text>
              <TouchableOpacity onPress={() => setShowAgentModal(false)}>
                <X color={THEME.colors.text} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {agents.map((agent) => (
                <TouchableOpacity
                  key={agent.id}
                  style={styles.agentItem}
                  onPress={() => handleAssignAgent(agent.id)}
                  disabled={assigning}
                >
                  <View style={styles.agentInfo}>
                    <Text style={styles.agentName}>{agent.name}</Text>
                    <Text style={styles.agentPhone}>{agent.phone}</Text>
                  </View>
                  <View style={[
                    styles.agentStatus, 
                    { backgroundColor: agent.status === 'online' ? THEME.colors.success : THEME.colors.textMuted }
                  ]} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    marginBottom: THEME.sizes.spacingLg,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  subtitleText: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.textMuted,
    marginTop: 4,
  },
  requestCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    padding: THEME.sizes.spacingLg,
    marginBottom: THEME.sizes.spacingLg,
    ...THEME.shadows.small,
  },
  activeCard: {
    borderColor: THEME.colors.primary,
    borderWidth: 2,
    ...THEME.shadows.medium,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingLg,
  },
  idBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  idText: {
    fontSize: THEME.sizes.lg,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: THEME.sizes.xs,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  locationGroup: {
    marginBottom: THEME.sizes.spacingLg,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotOrigin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.primary,
    marginRight: 12,
  },
  dotDest: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: THEME.colors.secondary,
    marginRight: 12,
  },
  locationLine: {
    width: 2,
    height: 16,
    backgroundColor: THEME.colors.borderLight,
    marginLeft: 4,
    marginVertical: 4,
  },
  locationText: {
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
    fontWeight: "500",
  },
  expandedMenu: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.borderLight,
    marginVertical: 16,
  },
  assignLabel: {
    fontSize: THEME.sizes.sm,
    fontWeight: "700",
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
    paddingTop: THEME.sizes.spacingLg,
  },
  typeText: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textMuted,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  tapText: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.primary,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: THEME.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  agentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  agentPhone: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  agentStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
