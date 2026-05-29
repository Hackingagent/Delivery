import { BAMap } from "@/components/BAMap";
import { THEME } from "@/constants/theme";
import { styles } from "@/styles/track.styles";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
    MessageSquare,
    Navigation,
    Phone,
} from "lucide-react-native";
import { useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INITIAL_REGION = {
  latitude: 5.9631,
  longitude: 10.1591,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function TrackingScreen() {
  const router = useRouter();
  const mapRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "Order Placed",
      time: "10:30 AM",
      active: false,
      completed: true,
    },
    {
      id: 2,
      title: "Courier Assigned",
      time: "10:32 AM",
      active: false,
      completed: true,
    },
    {
      id: 3,
      title: "Package Picked Up",
      time: "10:45 AM",
      active: true,
      completed: false,
    },
    {
      id: 4,
      title: "Heading to Destination",
      time: "Est. 11:15 AM",
      active: false,
      completed: false,
    },
    {
      id: 5,
      title: "Delivered",
      time: "--:--",
      active: false,
      completed: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={THEME.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track #BAM-4A02</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.mapContainer}>
          <BAMap ref={mapRef} initialRegion={INITIAL_REGION} mapStyle={[]} />
          <View style={styles.etaOverlay}>
            <Text style={styles.etaLabel}>Estimated Arrival</Text>
            <Text style={styles.etaTime}>11:15 AM</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.driverSection}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitials}>JM</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>John Mbah</Text>
              <Text style={styles.driverVehicle}>
                Toyota Corolla • CE-124-BT
              </Text>
            </View>
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={() => router.push("/chat/1")}
            >
              <MessageSquare color={THEME.colors.primary} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <Phone color={THEME.colors.primary} size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.timelineSection}>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepIndicator}>
                  {step.completed ? (
                    <CheckCircle2 color={THEME.colors.success} size={24} />
                  ) : step.active ? (
                    <Navigation
                      color={THEME.colors.primary}
                      size={24}
                      fill={THEME.colors.primary}
                    />
                  ) : (
                    <Circle color={THEME.colors.border} size={24} />
                  )}
                  {index !== steps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        step.completed && styles.stepLineActive,
                      ]}
                    />
                  )}
                </View>
                <View
                  style={[
                    styles.stepText,
                    step.active && styles.stepTextActiveContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepTitle,
                      step.active && styles.stepTitleActive,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
