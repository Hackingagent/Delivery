import {
  adminLogin as loginRequest,
  adminLogout as logoutRequest,
  fetchAdminProfile,
  getAdminToken,
  getStoredAdmin,
} from "@/lib/adminAuth";
import type { AdminUser } from "@/types/admin";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AdminAuthContextValue = {
  admin: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getAdminToken();
      if (!token) {
        setAdmin(null);
        return;
      }

      const cached = await getStoredAdmin();
      if (cached) {
        setAdmin(cached);
      }

      const profile = await fetchAdminProfile();
      setAdmin(profile);
    } catch {
      setAdmin(null);
      await logoutRequest();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    setAdmin(response.admin);
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({
      admin,
      isLoading,
      isAuthenticated: !!admin,
      login,
      logout,
      refresh: bootstrap,
    }),
    [admin, isLoading, login, logout, bootstrap],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
