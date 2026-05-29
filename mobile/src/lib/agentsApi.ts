import { apiRequest } from "@/lib/api";
import type {
  Agent,
  AgentResponse,
  AgentsListResponse,
} from "@/types/admin";

export type AgentPayload = {
  name: string;
  phone: string;
  pin?: string;
  base_zone?: string;
  vehicle_plate?: string;
  status?: Agent["status"];
  is_active?: boolean;
};

export async function fetchAgents(statusFilter?: string): Promise<Agent[]> {
  const params = new URLSearchParams();
  if (statusFilter && statusFilter !== "All") {
    params.set("status", statusFilter);
  }

  const query = params.toString();
  const path = query ? `/admin/agents?${query}` : "/admin/agents";

  const data = await apiRequest<AgentsListResponse>(path, { auth: "admin" });
  return data.data;
}

export async function fetchAgent(id: number): Promise<Agent> {
  const data = await apiRequest<AgentResponse>(`/admin/agents/${id}`, {
    auth: "admin",
  });
  return data.agent;
}

export async function createAgent(payload: AgentPayload): Promise<Agent> {
  const data = await apiRequest<AgentResponse>("/admin/agents", {
    method: "POST",
    auth: "admin",
    body: JSON.stringify(payload),
  });
  return data.agent;
}

export async function updateAgent(
  id: number,
  payload: AgentPayload,
): Promise<Agent> {
  const data = await apiRequest<AgentResponse>(`/admin/agents/${id}`, {
    method: "PUT",
    auth: "admin",
    body: JSON.stringify(payload),
  });
  return data.agent;
}

export async function deleteAgent(id: number): Promise<void> {
  await apiRequest(`/admin/agents/${id}`, {
    method: "DELETE",
    auth: "admin",
  });
}
