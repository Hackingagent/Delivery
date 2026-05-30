import { API_URL } from "@/constants/api";
import { getAdminToken, getAgentToken, getAuthToken } from "@/lib/storage";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    payload?: { errors?: Record<string, string[]> },
  ) {
    super(message);
    this.status = status;
    this.errors = payload?.errors;
  }
}

export type AuthScope = "admin" | "agent" | "user";

type RequestOptions = RequestInit & {
  auth?: AuthScope | false;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth = false, headers: customHeaders, ...init } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  };

  if (auth === "admin") {
    const token = await getAdminToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  if (auth === "agent") {
    const token = await getAgentToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  if (auth === "user") {
    const token = await getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers,
    });
  } catch {
    throw new ApiError(
      `Cannot reach the server at ${API_URL}. Check mobile/.env (EXPO_PUBLIC_API_URL), use your PC's LAN IP on a physical phone, then restart Expo with: npx expo start -c`,
      0,
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ??
      (data.errors ? Object.values(data.errors).flat()[0] : null) ??
      "Request failed.";
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}
