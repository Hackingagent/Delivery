import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { MapPin, PackageOpen, Users } from "lucide-react-native";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminRequestsScreen() {
  const [activeRequest, setActiveRequest] = useState<string | null>(null);

  const requests = [
    {
      id: "BAM-1044",
      status: "Pending",
      type: "Electronics",
      from: "Commercial Ave",
      to: "Nkwen",
    },
    {
      id: "BAM-1045",
      status: "In Transit",
      type: "Documents",
      from: "Hospital",
      to: "Up Station",
    },
    {
      id: "BAM-1046",
      status: "Delivered",
      type: "Food",
      from: "Bambili",
      to: "Bambui",
    },
  ];

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

        {requests.map((req) => (
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
                <Text style={styles.idText}>{req.id}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  req.status === "Delivered" && {
                    backgroundColor: THEME.colors.success + "20",
                  },
                  req.status === "In Transit" && {
                    backgroundColor: THEME.colors.secondary + "20",
                  },
                  req.status === "Pending" && {
                    backgroundColor: THEME.colors.error + "20",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    req.status === "Delivered" && {
                      color: THEME.colors.success,
                    },
                    req.status === "In Transit" && {
                      color: THEME.colors.secondary,
                    },
                    req.status === "Pending" && { color: THEME.colors.error },
                  ]}
                >
                  {req.status}
                </Text>
              </View>
            </View>

            <View style={styles.locationGroup}>
              <View style={styles.locationRow}>
                <View style={styles.dotOrigin} />
                <Text style={styles.locationText}>{req.from}</Text>
              </View>
              <View style={styles.locationLine} />
              <View style={styles.locationRow}>
                <View style={styles.dotDest} />
                <Text style={styles.locationText}>{req.to}</Text>
              </View>
            </View>

            {/* EXPANDED INTERACTIVE MENU */}
            {activeRequest === req.id && (
              <View style={styles.expandedMenu}>
                <View style={styles.divider} />
                <Text style={styles.assignLabel}>Admin Controls</Text>

                {req.status === "Pending" ? (
                  <View style={styles.actionGrid}>
                    <Button
                      title="Auto Assign Driver"
                      icon={<Users color={THEME.colors.surface} size={18} />}
                      style={{
                        flex: 1,
                        backgroundColor: THEME.colors.primary,
                        paddingVertical: 12,
                      }}
                      textStyle={{ fontSize: 14 }}
                      onPress={() => {
                        Alert.alert(
                          "Assignment Success",
                          `Driver Jude Courier has been assigned to Order ${req.id} and dispatched.`,
                        );
                        setActiveRequest(null);
                      }}
                    />
                  </View>
                ) : (
                  <View style={styles.actionGrid}>
                    <Button
                      title="Live Track"
                      icon={<MapPin color={THEME.colors.surface} size={18} />}
                      style={{
                        flex: 1,
                        backgroundColor: THEME.colors.secondary,
                        paddingVertical: 12,
                      }}
                      textStyle={{ fontSize: 14 }}
                    />
                  </View>
                )}
              </View>
            )}

            {!activeRequest || activeRequest !== req.id ? (
              <View style={styles.cardFooter}>
                <Text style={styles.typeText}>{req.type}</Text>
                <Text style={styles.tapText}>Tap to manage</Text>
              </View>
            ) : null}
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
});
