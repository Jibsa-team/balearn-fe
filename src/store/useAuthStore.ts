import { TeamUser } from "@/types/dashboard/dashboard";
import { User } from "@/types/user/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string;
  expirationTime: number;
  user: User | null;
  teamUser: TeamUser | null;
  setAccessToken: (token: string, expirationTime: number) => void;
  clearAccessToken: () => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setTeamUser: (user: TeamUser) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: "",
      expirationTime: 0,
      user: null,
      teamUser: null,
      setAccessToken: (token: string, expirationTime: number) =>
        set({ accessToken: token, expirationTime }),
      clearAccessToken: () => set({ accessToken: "", expirationTime: 0 }),
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
      setTeamUser: (teamUser: TeamUser) => set({ teamUser }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
