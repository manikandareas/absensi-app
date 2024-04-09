import { User } from "@/types/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type BackendTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number | null;
};

export type AuthStore = {
  user: User | null;
  backendTokens: BackendTokens | null;
  onSignInSuccess: (
    payload: Omit<AuthStore, "onSignInSuccess" | "onSignOutSuccess">,
  ) => void;
  onSignOutSuccess: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      backendTokens: null,

      onSignInSuccess: ({ user, backendTokens }) =>
        set({
          user,
          backendTokens,
        }),
      onSignOutSuccess: () => {
        localStorage.removeItem("absensi-storage");
        sessionStorage.removeItem("absensi-storage");
        return set({
          user: null,
          backendTokens: null,
        });
      },
    }),
    {
      name: "absensi-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
