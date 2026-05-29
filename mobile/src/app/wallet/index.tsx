import { THEME } from "@/constants/theme";
import { styles } from "@/styles/wallet.styles";
import { useRouter } from "expo-router";
import {
    ArrowDownCircle,
    ArrowLeft,
    ArrowUpCircle,
    Gift
} from "lucide-react-native";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletScreen() {
  const router = useRouter();

  const transactions = [
    {
      id: 1,
      type: "Delivery Paid",
      amount: "- XAF 1,500",
      date: "Today, 10:42 AM",
      icon: <ArrowUpCircle color={THEME.colors.error} size={24} />,
    },
    {
      id: 2,
      type: "Top Up",
      amount: "+ XAF 10,000",
      date: "Yesterday, 04:15 PM",
      icon: <ArrowDownCircle color={THEME.colors.success} size={24} />,
    },
    {
      id: 3,
      type: "Promo Applied",
      amount: "+ XAF 500",
      date: "May 15, 08:30 AM",
      icon: <Gift color={THEME.colors.primary} size={24} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>XAF 45,000</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <ArrowDownCircle color={THEME.colors.surface} size={20} />
              <Text style={styles.actionBtnText}>Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnOutline]}
            >
              <ArrowUpCircle color={THEME.colors.surface} size={20} />
              <Text style={styles.actionBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.promoSection}>
          <View style={styles.promoHeader}>
            <Gift color={THEME.colors.primary} size={20} />
            <Text style={styles.promoTitle}>Have a Promo Code?</Text>
          </View>
          <View style={styles.promoInputBox}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter code here..."
              placeholderTextColor={THEME.colors.textMuted}
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.txRow}>
              <View style={styles.txIconBox}>{tx.icon}</View>
              <View style={styles.txDetails}>
                <Text style={styles.txType}>{tx.type}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <Text
                style={[
                  styles.txAmount,
                  {
                    color: tx.amount.includes("+")
                      ? THEME.colors.success
                      : THEME.colors.text,
                  },
                ]}
              >
                {tx.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
