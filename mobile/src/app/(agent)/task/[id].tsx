import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Camera,
    CheckCircle2,
    MapPin,
    MessageSquare,
    Navigation,
    Phone,
} from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentTaskScreen() {
  const router = useRouter();
  const { id, status } = useLocalSearchParams();

  // Statuses: undefined/empty -> accepted -> picked_up -> delivered
  const currentStatus = (status as string) || "pending";

  if (currentStatus === "delivered") {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <CheckCircle2
          color={THEME.colors.success}
          size={100}
          style={{ marginBottom: 24 }}
        />
        <Text
          style={[
            styles.cardTitle,
            { fontSize: 24, alignSelf: "center", color: THEME.colors.text },
          ]}
        >
          TASK COMPLETED
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: THEME.colors.textMuted,
            marginTop: 12,
            marginBottom: 40,
            paddingHorizontal: 32,
          }}
        >
          You have successfully delivered order {id}. Your payment of 1,500 FCFA
          has been credited.
        </Text>
        <Button
          title="Return to Dashboard"
          onPress={() => router.replace("/(agent)/")}
          style={{ width: "80%", backgroundColor: THEME.colors.secondary }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Timeline Header */}
        <View style={styles.progressHeader}>
          <Text style={styles.taskId}>Order {id || "BAM-1042"}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>
              {currentStatus === "pending"
                ? "NEW REQUEST"
                : currentStatus === "accepted"
                  ? "AWAITING PICKUP"
                  : "IN TRANSIT"}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pickup Details</Text>
          <View style={styles.addressBox}>
            <MapPin color={THEME.colors.primary} size={20} />
            <Text style={styles.addressText}>
              Commercial Avenue, Ntarinkon Board
            </Text>
          </View>
          <Text style={styles.subtext}>Sender: John Doe</Text>

          {(currentStatus === "accepted" || currentStatus === "pending") && (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Phone color={THEME.colors.secondary} size={18} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MessageSquare color={THEME.colors.secondary} size={18} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={[styles.card, currentStatus === "pending" && { opacity: 0.6 }]}
        >
          <Text style={styles.cardTitle}>Drop-off Details</Text>
          <View style={styles.addressBox}>
            <MapPin color={THEME.colors.secondary} size={20} />
            <Text style={styles.addressText}>
              Nkwen, Opposite Total Station
            </Text>
          </View>
          <Text style={styles.subtext}>Receiver: Jane Smith</Text>

          {currentStatus === "picked_up" && (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Phone color={THEME.colors.secondary} size={18} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MessageSquare color={THEME.colors.secondary} size={18} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.instructionsCard}>
          <Text style={styles.cardTitle}>Special Instructions</Text>
          <Text style={styles.subtext}>
            Package is fragile (Electronics). Please handle with care. Wait at
            the gate.
          </Text>
        </View>
      </ScrollView>

      {/* Dynamic Footer Actions Based on State */}
      <View style={styles.footer}>
        {currentStatus === "pending" && (
          <Button
            title="Accept Request"
            style={{ backgroundColor: THEME.colors.secondary }}
            onPress={() =>
              router.replace({
                pathname: "/(agent)/task/BAM-1042",
                params: { status: "accepted" },
              })
            }
          />
        )}

        {currentStatus === "accepted" && (
          <View style={{ gap: 12 }}>
            <Button
              title="Navigate to Pickup"
              icon={<Navigation color={THEME.colors.text} size={20} />}
              type="outline"
            />
            <Button
              title="Verify Pickup (Snap Package)"
              icon={<Camera color={THEME.colors.surface} size={20} />}
              style={{ backgroundColor: THEME.colors.secondary }}
              onPress={() =>
                router.push({
                  pathname: "/(agent)/camera",
                  params: {
                    returnTo: "/(agent)/task/BAM-1042",
                    nextStatus: "picked_up",
                  },
                })
              }
            />
          </View>
        )}

        {currentStatus === "picked_up" && (
          <View style={{ gap: 12 }}>
            <Button
              title="Navigate to Dropoff"
              icon={<Navigation color={THEME.colors.text} size={20} />}
              type="outline"
            />
            <Button
              title="Verify Delivery (Snap Package)"
              icon={<Camera color={THEME.colors.surface} size={20} />}
              style={{ backgroundColor: THEME.colors.success }}
              onPress={() =>
                router.push({
                  pathname: "/(agent)/camera",
                  params: {
                    returnTo: "/(agent)/task/BAM-1042",
                    nextStatus: "delivered",
                  },
                })
              }
            />
          </View>
        )}
      </View>
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
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingXl,
  },
  taskId: {
    fontSize: THEME.sizes.xl,
    fontWeight: "800",
    color: THEME.colors.text,
  },
  statusBadge: {
    backgroundColor: THEME.colors.secondary + "1A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: THEME.colors.secondary,
    fontWeight: "700",
    fontSize: THEME.sizes.sm,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacingLg,
    ...THEME.shadows.small,
  },
  cardTitle: {
    fontSize: THEME.sizes.sm,
    fontWeight: "700",
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: THEME.sizes.spacing,
  },
  addressBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },
  addressText: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
    flex: 1,
    lineHeight: 22,
  },
  subtext: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
    paddingLeft: 32,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: THEME.sizes.spacing,
    paddingLeft: 32,
  },
  actionBtn: {
    padding: 10,
    borderRadius: THEME.sizes.radiusMd,
    backgroundColor: THEME.colors.background,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  instructionsCard: {
    backgroundColor: THEME.colors.primary + "1A", // Light orange
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacingXl,
  },
  footer: {
    padding: THEME.sizes.spacingLg,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
    paddingBottom: 40,
  },
});
