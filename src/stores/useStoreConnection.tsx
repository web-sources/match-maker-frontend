import { create } from "zustand";

type ConnectionState = {
  user1: string | null;
  user2: string | null;
};

type ConnectionStore = {
  connection: ConnectionState;
  setConnection: (user1: string | null, user2: string | null) => void;
  resetConnection: () => void;
};

export const useStoreConnection = create<ConnectionStore>((set) => ({
  connection: { user1: null, user2: null },
  setConnection: (user1, user2) => set({ connection: { user1, user2 } }),
  resetConnection: () => set({ connection: { user1: null, user2: null } }),
}));
