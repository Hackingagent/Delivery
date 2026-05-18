import { Button } from "@/components/Button";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/receipt.styles";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    CheckCircle,
    Download,
    Share2
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReceiptScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-Receipt</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Share2 color={THEME.colors.text} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.receiptCard}>
          {/* Top Success Branding */}
          <View style={styles.successHeader}>
            <CheckCircle color={THEME.colors.success} size={48} />
            <Text style={styles.successTitle}>Payment Success!</Text>
            <Text style={styles.successAmount}>XAF 1,500</Text>
          </View>

          {/* Dashed Line separator mimicking real paper receipt */}
          <View style={styles.dashLineContainer}>
            <View style={styles.circleCutoutLeft} />
            <View style={styles.dashLine} />
            <View style={styles.circleCutoutRight} />
          </View>

          {/* Details Section */}
          <View style={styles.detailsBody}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Reference No.</Text>
              <Text style={styles.detailValue}>BAM-TX9204A</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order Date</Text>
              <Text style={styles.detailValue}>May 18, 2026 - 10:45 AM</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Mode</Text>
              <Text style={styles.detailValue}>Mobile Money (MoMo)</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Courier</Text>
              <Text style={styles.detailValue}>John Mbah</Text>
            </View>

            <View style={styles.solidDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivery Fee</Text>
              <Text style={styles.detailValue}>XAF 1,300</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Taxes & Fees</Text>
              <Text style={styles.detailValue}>XAF 200</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Promo Discount</Text>
              <Text
                style={[styles.detailValue, { color: THEME.colors.success }]}
              >
                - XAF 0
              </Text>
            </View>

            <View style={styles.solidDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalValue}>XAF 1,500</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Download PDF"
          icon={<Download color={THEME.colors.primary} size={20} />}
          style={styles.downloadBtn}
          textStyle={styles.downloadBtnText}
        />
      </View>
    </SafeAreaView>
  );
}
