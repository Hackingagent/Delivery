export type Agent = {
  id: number;
  name: string;
  phone: string;
  license_id: string;
  base_zone: string | null;
  vehicle_plate: string | null;
  status: "offline" | "online" | "in_transit";
  status_label: string;
  is_active: boolean;
  avatar_path: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type AgentLoginResponse = {
  message: string;
  token: string;
  token_type: string;
  agent: Agent;
};
