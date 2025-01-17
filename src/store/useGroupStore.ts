import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GroupStore {
  groupId: number;
  setGroupId: (id: number) => void;
}

const useGroupStore = create<GroupStore>()(
  persist(
    (set) => ({
      groupId: 0,
      setGroupId: (id: number) => set({ groupId: id }),
    }),
    {
      name: "group-storage",
    }
  )
);

export default useGroupStore;
