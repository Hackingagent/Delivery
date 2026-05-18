import { THEME } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, X } from "lucide-react-native";
import { useState } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AgentCameraScreen() {
  const router = useRouter();
  const { returnTo, nextStatus } = useLocalSearchParams();
  const [captured, setCaptured] = useState(false);
  const flashOpacity = new Animated.Value(0);

  const takePicture = () => {
    // Flash animation to fake shutter
    Animated.sequence([
      Animated.timing(flashOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(flashOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCaptured(true);

      // Navigate back cleanly using replace to avoid stack trapping
      setTimeout(() => {
        if (returnTo) {
          router.replace({
            pathname: returnTo as any,
            params: { status: nextStatus },
          });
        } else {
          router.replace("/(agent)/");
        }
      }, 2000);
    });
  };

  if (captured) {
    return (
      <View style={styles.successContainer}>
        <CheckCircle2 color={THEME.colors.success} size={110} />
        <Text style={styles.successText}>Image Verified!</Text>
        <Text style={styles.successSubtext}>
          Package delivery step recorded securely.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mock Camera Viewfinder */}
      <View style={styles.viewfinderContainer}>
        <View style={styles.targetCornerTL} />
        <View style={styles.targetCornerTR} />
        <View style={styles.targetCornerBL} />
        <View style={styles.targetCornerBR} />
        <Text style={styles.hintText}>Align package securely within frame</Text>
      </View>

      {/* Header Actions */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <X color={THEME.colors.surface} size={28} />
        </TouchableOpacity>
      </View>

      {/* Flash Overlay */}
      <Animated.View
        pointerEvents="none"
        style={[styles.flashOverlay, { opacity: flashOpacity }]}
      />

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.shutterRing} onPress={takePicture}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  closeBtn: {
    padding: THEME.sizes.spacingSm,
  },
  viewfinderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  hintText: {
    position: "absolute",
    bottom: "25%",
    color: THEME.colors.surface,
    fontSize: THEME.sizes.md,
    fontWeight: "600",
  },
  targetCornerTL: {
    position: "absolute",
    top: "30%",
    left: "10%",
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: THEME.colors.secondary,
  },
  targetCornerTR: {
    position: "absolute",
    top: "30%",
    right: "10%",
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: THEME.colors.secondary,
  },
  targetCornerBL: {
    position: "absolute",
    bottom: "35%",
    left: "10%",
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: THEME.colors.secondary,
  },
  targetCornerBR: {
    position: "absolute",
    bottom: "35%",
    right: "10%",
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: THEME.colors.secondary,
  },
  controls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  shutterRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: THEME.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: THEME.colors.surface,
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.colors.surface,
    zIndex: 100,
  },
  successContainer: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  successText: {
    fontSize: 28,
    fontWeight: "800",
    color: THEME.colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 16,
    color: THEME.colors.textLight,
    textAlign: "center",
  },
});
