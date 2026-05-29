import Constants from "expo-constants";

const defaultUrl = "http://10.0.2.2:8000/api";

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ??
  Constants.expoConfig?.extra?.apiUrl ??
  defaultUrl
).replace(/\/$/, "");

if (__DEV__) {
  console.log("[API] Using base URL:", API_URL);
}
