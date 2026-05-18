import { THEME } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: THEME.sizes.spacingLg,
    paddingTop:
      Platform.OS === "android" ? THEME.sizes.spacingLg : THEME.sizes.spacingSm,
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderLight,
    ...THEME.shadows.small,
    zIndex: 10,
  },
  iconButton: {
    padding: THEME.sizes.spacingSm,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerName: {
    fontSize: THEME.sizes.md,
    fontWeight: "700",
    color: THEME.colors.text,
  },
  headerStatus: {
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
  },
  chatScroll: {
    padding: THEME.sizes.spacingLg,
    gap: THEME.sizes.spacingMd,
  },
  systemMessageContainer: {
    alignItems: "center",
    marginVertical: THEME.sizes.spacingSm,
  },
  systemMessage: {
    backgroundColor: THEME.colors.borderLight,
    paddingHorizontal: THEME.sizes.spacing,
    paddingVertical: 6,
    borderRadius: THEME.sizes.radiusPill,
    fontSize: THEME.sizes.xs,
    color: THEME.colors.textLight,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: THEME.sizes.spacing,
    borderRadius: THEME.sizes.radiusLg,
    marginBottom: THEME.sizes.spacingSm,
  },
  driverBubble: {
    alignSelf: "flex-start",
    backgroundColor: THEME.colors.surface,
    borderBottomLeftRadius: 4,
    ...THEME.shadows.small,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: THEME.colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: THEME.sizes.md,
    lineHeight: 22,
    color: THEME.colors.text,
  },
  userText: {
    color: THEME.colors.textInverse,
  },
  timeText: {
    fontSize: 10,
    marginTop: 6,
    color: THEME.colors.textLight,
    alignSelf: "flex-end",
  },
  userTime: {
    color: "rgba(255,255,255,0.7)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: THEME.sizes.spacing,
    paddingBottom:
      Platform.OS === "ios" ? THEME.sizes.spacingLg : THEME.sizes.spacing,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.borderLight,
  },
  textInput: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.sizes.radiusPill,
    paddingHorizontal: THEME.sizes.spacingLg,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: THEME.sizes.md,
    color: THEME.colors.text,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.colors.textMuted,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: THEME.sizes.spacingSm,
  },
  sendButtonActive: {
    backgroundColor: THEME.colors.primary,
  },
});
