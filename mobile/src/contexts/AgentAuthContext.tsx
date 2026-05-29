import {
  agentLogin as loginRequest,
  agentLogout as logoutRequest,
  fetchAgentProfile,
  getAgentToken,
  getStoredAgent,
} from "@/lib/agentAuth";
import type { Agent } from "@/types/agent";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AgentAuthContextValue = {
  agent: Agent | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AgentAuthContext = createContext<AgentAuthContextValue | null>(null);

export function AgentAuthProvider({ children }: { children: React.ReactNode }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getAgentToken();
      if (!token) {
        setAgent(null);
        return;
      }

      const cached = await getStoredAgent();
      if (cached) {
        setAgent(cached);
      }

      const profile = await fetchAgentProfile();
      setAgent(profile);
    } catch {
      setAgent(null);
      await logoutRequest();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const login = useCallback(async (phone: string, pin: string) => {
    const response = await loginRequest(phone, pin);
    setAgent(response.agent);
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setAgent(null);
  }, []);

  const value = useMemo(
    () => ({
      agent,
      isLoading,
      isAuthenticated: !!agent,
      login,
      logout,
      refresh: bootstrap,
    }),
    [agent, isLoading, login, logout, bootstrap],
  );

  return (
    <AgentAuthContext.Provider value={value}>
      {children}
    </AgentAuthContext.Provider>
  );
}

export function useAgentAuth() {
  const context = useContext(AgentAuthContext);
  if (!context) {
    throw new Error("useAgentAuth must be used within AgentAuthProvider");
  }
  return context;
}
