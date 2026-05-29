import { THEME } from "@/constants/theme";
import { styles } from "@/styles/support.styles";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    ChevronRight,
    MessageSquare,
    PhoneCall,
    Search,
} from "lucide-react-native";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SupportScreen() {
  const router = useRouter();

  const faqs = [
    "How to track my delivery?",
    "Where is my driver?",
    "Fee refund processing times",
    "Change delivery destination mid-trip",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Hi Ahmadou,</Text>
        <Text style={styles.subGreeting}>How can we help you today?</Text>

        <View style={styles.searchBar}>
          <Search color={THEME.colors.textMuted} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            placeholderTextColor={THEME.colors.textMuted}
          />
        </View>

        <View style={styles.contactSection}>
          <TouchableOpacity style={styles.contactCard}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: THEME.colors.primary + "20" },
              ]}
            >
              <MessageSquare color={THEME.colors.primary} size={24} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactDesc}>We reply within 5 mins</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactCard}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: THEME.colors.success + "20" },
              ]}
            >
              <PhoneCall color={THEME.colors.success} size={24} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Call Us</Text>
              <Text style={styles.contactDesc}>Toll-free line 24/7</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked</Text>
        <View style={styles.faqList}>
          {faqs.map((faq, index) => (
            <TouchableOpacity key={index} style={styles.faqItem}>
              <Text style={styles.faqText}>{faq}</Text>
              <ChevronRight color={THEME.colors.textMuted} size={20} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
