import { THEME } from "@/constants/theme";
import { styles } from "@/styles/menu.styles";
import { useRouter } from "expo-router";
import {
    CreditCard,
    FileText,
    LifeBuoy,
    LogOut,
    MapPin,
    Settings,
    X,
} from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.75;

export default function MenuDrawer() {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const closeMenu = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
      if (callback) callback();
    });
  };

  const handleNavigate = (path: any) => {
    closeMenu(() => {
      router.push(path);
    });
  };

  return (
    <View style={styles.overlayContainer}>
      <TouchableWithoutFeedback onPress={() => closeMenu()}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View>
              <Text style={styles.userName}>Ahmadou Ahidjo</Text>
              <Text style={styles.userPhone}>+237 671 234 567</Text>
            </View>
            <TouchableOpacity onPress={() => closeMenu()}>
              <X color={THEME.colors.text} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            <MenuItem
              icon={<CreditCard color={THEME.colors.primary} size={22} />}
              label="Wallet & Promos"
              onPress={() => handleNavigate("/wallet")}
            />
            <MenuItem
              icon={<MapPin color={THEME.colors.primary} size={22} />}
              label="Saved Addresses"
              onPress={() => handleNavigate("/addresses")}
            />
            <MenuItem
              icon={<FileText color={THEME.colors.primary} size={22} />}
              label="Delivery Receipts"
              onPress={() => handleNavigate("/receipts/history")}
            />
            <MenuItem
              icon={<Settings color={THEME.colors.primary} size={22} />}
              label="Settings"
              onPress={() => handleNavigate("/settings")}
            />
            <MenuItem
              icon={<LifeBuoy color={THEME.colors.primary} size={22} />}
              label="Help & Support"
              onPress={() => handleNavigate("/support")}
            />
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => handleNavigate("/(auth)/login")}
          >
            <LogOut color={THEME.colors.error} size={20} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

function MenuItem({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconBox}>{icon}</View>
      <Text style={styles.menuItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
