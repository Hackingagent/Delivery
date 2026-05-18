import { THEME } from "@/constants/theme";
import {
    ArrowDownCircle,
    Banknote,
    Calendar,
    TrendingUp,
} from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentEarningsScreen() {
  const transactions = [
    {
      id: 1,
      type: "Delivery (BAM-1044)",
      amount: "+1,500 FCFA",
      time: "2 hours ago",
      isPositive: true,
    },
    {
      id: 2,
      type: "Delivery (BAM-1042)",
      amount: "+800 FCFA",
      time: "5 hours ago",
      isPositive: true,
    },
    {
      id: 3,
      type: "Wallet Withdrawal",
      amount: "-10,000 FCFA",
      time: "Yesterday",
      isPositive: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>
            22,400 <Text style={{ fontSize: 20 }}>FCFA</Text>
          </Text>

          <TouchableOpacity style={styles.withdrawBtn}>
            <ArrowDownCircle color={THEME.colors.primary} size={18} />
            <Text style={styles.withdrawText}>Withdraw to Mobile Money</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>This Week's Summary</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <TrendingUp
              color={THEME.colors.secondary}
              size={24}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Trips Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Banknote
              color={THEME.colors.success}
              size={24}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.statValue}>31k</Text>
            <Text style={styles.statLabel}>Total Earned</Text>
          </View>
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Calendar color={THEME.colors.primary} size={16} />
          </TouchableOpacity>
        </View>

        {transactions.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <View
              style={[
                styles.iconCircle,
                !item.isPositive && {
                  backgroundColor: THEME.colors.error + "20",
                },
              ]}
            >
              {item.isPositive ? (
                <TrendingUp color={THEME.colors.success} size={20} />
              ) : (
                <ArrowDownCircle color={THEME.colors.error} size={20} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemType}>{item.type}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
            <Text
              style={[
                styles.itemAmount,
                !item.isPositive && { color: THEME.colors.text },
              ]}
            >
              {item.amount}
            </Text>
          </View>
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
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: THEME.colors.secondary,
    borderRadius: THEME.sizes.radiusLg,
    padding: THEME.sizes.spacingXl,
    alignItems: "center",
    marginBottom: THEME.sizes.spacingXl,
    ...THEME.shadows.large,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    marginBottom: 8,
  },
  balanceAmount: {
    color: THEME.colors.surface,
    fontSize: 40,
    fontWeight: "800",
    marginBottom: THEME.sizes.spacingLg,
  },
  withdrawBtn: {
    backgroundColor: THEME.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  withdrawText: {
    color: THEME.colors.primary,
    fontWeight: "700",
    fontSize: THEME.sizes.sm,
  },
  sectionTitle: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: THEME.sizes.spacingLg,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: THEME.sizes.spacingXl,
  },
  statBox: {
    flex: 1,
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    ...THEME.shadows.small,
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
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterBtn: {
    backgroundColor: THEME.colors.primary + "1A",
    padding: 8,
    borderRadius: 8,
    marginBottom: THEME.sizes.spacingLg,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    padding: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacing,
    ...THEME.shadows.small,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.colors.success + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  itemType: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  itemTime: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
    marginTop: 4,
  },
  itemAmount: {
    fontSize: THEME.sizes.md,
    fontWeight: "800",
    color: THEME.colors.success,
  },
});
