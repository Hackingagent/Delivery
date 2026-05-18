import { THEME } from "@/constants/theme";
import { styles } from "@/styles/addresses.styles";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Building2,
    Home,
    MapPin,
    MoreVertical,
    Plus,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddressesScreen() {
  const router = useRouter();

  const savedAddresses = [
    {
      id: 1,
      type: "Home",
      address: "124 Up Station Road, Behind CCAS",
      icon: <Home color={THEME.colors.primary} size={24} />,
    },
    {
      id: 2,
      type: "Office",
      address: "Commercial Avenue, Store 4B",
      icon: <Building2 color={THEME.colors.primary} size={24} />,
    },
    {
      id: 3,
      type: "Mom's House",
      address: "Ntarinkon Market Street",
      icon: <MapPin color={THEME.colors.textMuted} size={24} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <TouchableOpacity style={styles.addIconBtn}>
          <Plus color={THEME.colors.primary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.addLocationBtn}>
          <View style={styles.addIconBox}>
            <Plus color={THEME.colors.surface} size={24} />
          </View>
          <Text style={styles.addLocationText}>Add New Address</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your Locations</Text>
        <View style={styles.addressesList}>
          {savedAddresses.map((loc) => (
            <TouchableOpacity key={loc.id} style={styles.addressCard}>
              <View style={styles.iconBox}>{loc.icon}</View>
              <View style={styles.addressInfo}>
                <Text style={styles.addressType}>{loc.type}</Text>
                <Text style={styles.addressText} numberOfLines={2}>
                  {loc.address}
                </Text>
              </View>
              <TouchableOpacity>
                <MoreVertical color={THEME.colors.textLight} size={20} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Saving your addresses makes delivery booking 3x faster!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
