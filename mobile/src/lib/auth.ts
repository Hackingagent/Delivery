import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "@/lib/api";
import { USER_TOKEN_KEY, getAuthToken } from "@/lib/storage";
import type { User, LoginResponse, RegisterResponse } from "@/types/user";

const USER_KEY = "bamenda_user_profile";

export { getAuthToken };

export async function getStoredUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const data = await apiRequest<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  await AsyncStorage.setItem(USER_TOKEN_KEY, data.token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data;
}

export async function register(params: any): Promise<RegisterResponse> {
  const data = await apiRequest<RegisterResponse>("/register", {
    method: "POST",
    body: JSON.stringify({
        ...params,
        password_confirmation: params.password_confirmation || params.password
    }),
  });

  await AsyncStorage.setItem(USER_TOKEN_KEY, data.token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data;
}

export async function logout(): Promise<void> {
  const token = await getAuthToken();

  if (token) {
    try {
      await apiRequest("/logout", {
        method: "POST",
        auth: "user",
      });
    } catch {
      // Clear local session even if server logout fails
    }
  }

  await AsyncStorage.multiRemove([USER_TOKEN_KEY, USER_KEY]);
}

export async function fetchUserProfile(): Promise<User> {
  const data = await apiRequest<{ user: User }>("/me", {
    auth: "user",
  });
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}
