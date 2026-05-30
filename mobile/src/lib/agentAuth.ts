import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "@/lib/api";
import { AGENT_TOKEN_KEY, getAgentToken } from "@/lib/storage";
import type { Agent, AgentLoginResponse } from "@/types/agent";

const AGENT_KEY = "bamenda_agent_profile";

export { getAgentToken };

export async function getStoredAgent(): Promise<Agent | null> {
  const raw = await AsyncStorage.getItem(AGENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Agent;
  } catch {
    return null;
  }
}

export async function agentLogin(
  phone: string,
  pin: string,
): Promise<AgentLoginResponse> {
  const data = await apiRequest<AgentLoginResponse>("/agent/login", {
    method: "POST",
    body: JSON.stringify({ phone, pin }),
  });

  await AsyncStorage.setItem(AGENT_TOKEN_KEY, data.token);
  await AsyncStorage.setItem(AGENT_KEY, JSON.stringify(data.agent));

  return data;
}

export async function agentLogout(): Promise<void> {
  const token = await getAgentToken();

  if (token) {
    try {
      await apiRequest("/agent/logout", {
        method: "POST",
        auth: "agent",
      });
    } catch {
      // Clear local session even if server logout fails
    }
  }

  await AsyncStorage.multiRemove([AGENT_TOKEN_KEY, AGENT_KEY]);
}

export async function fetchAgentProfile(): Promise<Agent> {
  const data = await apiRequest<{ agent: Agent }>("/agent/me", {
    auth: "agent",
  });
  await AsyncStorage.setItem(AGENT_KEY, JSON.stringify(data.agent));
  return data.agent;
}
