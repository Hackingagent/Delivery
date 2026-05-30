import AsyncStorage from "@react-native-async-storage/async-storage";

export const ADMIN_TOKEN_KEY = "bamenda_admin_token";
export const AGENT_TOKEN_KEY = "bamenda_agent_token";
export const USER_TOKEN_KEY = "bamenda_user_token";

export async function getAdminToken(): Promise<string | null> {
  return AsyncStorage.getItem(ADMIN_TOKEN_KEY);
}

export async function getAgentToken(): Promise<string | null> {
  return AsyncStorage.getItem(AGENT_TOKEN_KEY);
}

export async function getAuthToken(): Promise<string | null> {
  return AsyncStorage.getItem(USER_TOKEN_KEY);
}
