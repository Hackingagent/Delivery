import { THEME } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ArrowLeft, Clock, FileDown, Search } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReceiptsHistoryScreen() {
  const router = useRouter();

  const receipts = [
    {
      id: "BAM-TX9204A",
      date: "May 18, 10:45 AM",
      amount: "XAF 1,500",
      items: "Package: Electronics",
    },
    {
      id: "BAM-TX8101C",
      date: "May 15, 02:15 PM",
      amount: "XAF 2,300",
      items: "Package: Documents",
    },
    {
      id: "BAM-TX7002D",
      date: "May 10, 11:30 AM",
      amount: "XAF 800",
      items: "Package: Food Box",
    },
    {
      id: "BAM-TX6419E",
      date: "April 28, 08:00 AM",
      amount: "XAF 1,200",
      items: "Package: Spare Parts",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Receipts</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchBar}>
          <Search color={THEME.colors.textMuted} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Reference No."
            placeholderTextColor={THEME.colors.textMuted}
          />
        </View>

        <Text style={styles.monthLabel}>Recent Deliveries</Text>

        <View style={styles.receiptsList}>
          {receipts.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={styles.receiptCard}
              onPress={() => router.push(`/receipts/${r.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.cardTop}>
                <View style={styles.iconBox}>
                  <FileDown color={THEME.colors.primary} size={20} />
                </View>
                <View style={styles.cardDetails}>
                  <Text style={styles.receiptId}>{r.id}</Text>
                  <View style={styles.dateRow}>
                    <Clock color={THEME.colors.textLight} size={14} />
                    <Text style={styles.receiptDate}>{r.date}</Text>
                  </View>
                </View>
                <Text style={styles.receiptAmount}>{r.amount}</Text>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.receiptItems}>{r.items}</Text>
                <Text style={styles.viewLink}>View Ticket</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingVertical: THEME.sizes.spacingLg,
  },
  backBtn: {
    padding: THEME.sizes.spacingSm,
    marginLeft: -THEME.sizes.spacingSm,
  },
  headerTitle: {
    fontSize: THEME.sizes.xl,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  scrollContent: {
    padding: THEME.sizes.spacingLg,
    paddingBottom: 100,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    paddingHorizontal: THEME.sizes.spacingLg,
    borderRadius: THEME.sizes.radiusLg,
    height: 56,
    ...THEME.shadows.small,
    marginBottom: THEME.sizes.spacingXl,
  },
  searchInput: {
    flex: 1,
    marginLeft: THEME.sizes.spacingMd,
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
  },
  monthLabel: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.textLight,
    marginBottom: THEME.sizes.spacingLg,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  receiptsList: {
    gap: THEME.sizes.spacingMd,
  },
  receiptCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.sizes.radiusLg,
    padding: THEME.sizes.spacingLg,
    ...THEME.shadows.small,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: THEME.sizes.spacingMd,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primary + "1A", // transparent orange
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacingLg,
  },
  cardDetails: {
    flex: 1,
  },
  receiptId: {
    fontSize: THEME.sizes.lg,
    fontWeight: "700",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  receiptDate: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
  receiptAmount: {
    fontSize: THEME.sizes.lg,
    fontWeight: "800",
    color: THEME.colors.primary,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
    paddingTop: THEME.sizes.spacingMd,
  },
  receiptItems: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textMuted,
  },
  viewLink: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.primary,
    fontWeight: "600",
  },
});
