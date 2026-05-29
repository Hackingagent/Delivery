import { THEME } from "@/constants/theme";
import { styles } from "@/styles/delivery-request/styles";
import { useRouter } from "expo-router";
import { ArrowLeft, Phone, SendHorizontal } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  // Mock Messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am on my way to the pickup location.",
      sender: "driver",
      time: "10:45 AM",
    },
    {
      id: 2,
      text: "Okay great. I am standing outside the gate.",
      sender: "user",
      time: "10:46 AM",
    },
  ]);

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    setMessages([
      ...messages,
      { id: Date.now(), text: message, sender: "user", time: "Now" },
    ]);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color={THEME.colors.text} size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerName}>John Doe</Text>
            <Text style={styles.headerStatus}>Motorbike • AB-1234</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Phone color={THEME.colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.chatScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.systemMessageContainer}>
            <Text style={styles.systemMessage}>
              Driver has accepted your request
            </Text>
          </View>

          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === "user" ? styles.userBubble : styles.driverBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === "user" && styles.userText,
                ]}
              >
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.timeText,
                  msg.sender === "user" && styles.userTime,
                ]}
              >
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor={THEME.colors.textMuted}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              message.trim().length > 0 && styles.sendButtonActive,
            ]}
            onPress={sendMessage}
            disabled={message.trim().length === 0}
          >
            <SendHorizontal color={THEME.colors.surface} size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
