import { THEME } from "@/constants/theme";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useRouter } from "expo-router";
import {
    Briefcase,
    Building2,
    LogOut,
    Map,
    Settings,
    Shield,
    Users,
    X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
// Make drawer slightly larger for admin
const DRAWER_WIDTH = width * 0.85;

export default function AdminMenuScreen() {
  const router = useRouter();
  const { admin, logout } = useAdminAuth();

  // Animation values
  const [slideAnim] = useState(new Animated.Value(-DRAWER_WIDTH));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Open immediately when mounted
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
  }, [slideAnim, fadeAnim]);

  const closeMenu = (callback?: () => void) => {
    // Slide and fade out
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
      // Must pop safely
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(admin)/");
      }
      if (callback) {
        callback();
      }
    });
  };

  const handleNavigate = (path: string) => {
    closeMenu(() => {
      if (path === "login") {
        router.replace("/(auth)/admin-login");
        return;
      }
      router.push(path as any);
    });
  };

  // Reusable item component specifically designed for Admin Side Menu
  const MenuItem = ({ icon, label, onPress, isDanger = false }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {icon}
      <Text
        style={[styles.menuItemText, isDanger && { color: THEME.colors.error }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={() => closeMenu()}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Drawer */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <Shield color={THEME.colors.surface} size={28} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{admin?.name ?? "Super Admin"}</Text>
                <Text style={styles.phone}>{admin?.email ?? "Control Center"}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => closeMenu()}
              style={styles.closeButton}
            >
              <X color={THEME.colors.textMuted} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.menuContent}>
            <Text style={styles.sectionLabel}>Overview</Text>
            <MenuItem
              icon={<Building2 color={THEME.colors.primary} size={22} />}
              label="Dashboard"
              onPress={() => handleNavigate("/(admin)/")}
            />

            <Text style={styles.sectionLabel}>Management</Text>
            <MenuItem
              icon={<Users color={THEME.colors.primary} size={22} />}
              label="Fleet / Agents"
              onPress={() => handleNavigate("/(admin)/agents")}
            />
            <MenuItem
              icon={<Briefcase color={THEME.colors.primary} size={22} />}
              label="All Requests"
              onPress={() => handleNavigate("/(admin)/requests")}
            />
            <MenuItem
              icon={<Map color={THEME.colors.primary} size={22} />}
              label="Live City Map"
              onPress={() => handleNavigate("/(admin)/")} // loops back for mock
            />

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>System</Text>
            <MenuItem
              icon={<Settings color={THEME.colors.primary} size={22} />}
              label="System Settings"
              onPress={() => handleNavigate("/(admin)/")}
            />
          </View>

          <View style={styles.logoutWrapper}>
            <MenuItem
              icon={<LogOut color={THEME.colors.error} size={22} />}
              label="Logout Admin"
              isDanger
              onPress={() =>
                closeMenu(async () => {
                  await logout();
                  router.replace("/(auth)/admin-login");
                })
              }
            />
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const SafeAreaView = ({ children }: any) => (
  <View
    style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 50 : 30,
      paddingBottom: 20,
    }}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: THEME.colors.surface,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    ...THEME.shadows.large,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingBottom: THEME.sizes.spacingLg,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: THEME.sizes.spacing,
  },
  profileInfo: {
    justifyContent: "center",
  },
  name: {
    fontSize: THEME.sizes.lg,
    fontWeight: "800",
    color: THEME.colors.text,
    marginBottom: 4,
  },
  phone: {
    fontSize: THEME.sizes.sm,
    color: THEME.colors.textLight,
  },
  closeButton: {
    padding: 8,
    backgroundColor: THEME.colors.background,
    borderRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.borderLight,
    marginHorizontal: THEME.sizes.spacingLg,
    marginVertical: THEME.sizes.spacing,
  },
  menuContent: {
    paddingHorizontal: THEME.sizes.spacingLg,
  },
  sectionLabel: {
    color: THEME.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginVertical: THEME.sizes.spacing,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: THEME.sizes.spacing,
    marginBottom: THEME.sizes.spacingSm,
  },
  menuItemText: {
    fontSize: THEME.sizes.md,
    fontWeight: "600",
    color: THEME.colors.text,
    marginLeft: THEME.sizes.spacingLg,
  },
  logoutWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: THEME.sizes.spacingLg,
  },
});
