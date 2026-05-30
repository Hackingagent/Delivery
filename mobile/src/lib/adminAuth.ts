import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "@/lib/api";
import { ADMIN_TOKEN_KEY, getAdminToken } from "@/lib/storage";
import type { AdminUser, LoginResponse } from "@/types/admin";

const ADMIN_KEY = "bamenda_admin_profile";

export { getAdminToken };

export async function getStoredAdmin(): Promise<AdminUser | null> {
  const raw = await AsyncStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export async function adminLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const data = await apiRequest<LoginResponse>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  await AsyncStorage.setItem(ADMIN_TOKEN_KEY, data.token);
  await AsyncStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));

  return data;
}

export async function adminLogout(): Promise<void> {
  const token = await getAdminToken();

  if (token) {
    try {
      await apiRequest("/admin/logout", {
        method: "POST",
        auth: "admin",
      });
    } catch {
      // Clear local session even if server logout fails
    }
  }

  await AsyncStorage.multiRemove([ADMIN_TOKEN_KEY, ADMIN_KEY]);
}

export async function fetchAdminProfile(): Promise<AdminUser> {
  const data = await apiRequest<{ admin: AdminUser }>("/admin/me", {
    auth: "admin",
  });
  await AsyncStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
  return data.admin;
}
