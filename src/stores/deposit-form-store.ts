import { create } from "zustand";

interface YieldsData {
  liq: string;
  amount: string;
}

interface YieldsStore {
  yieldsData: YieldsData | null;
  setYieldsData: (data: YieldsData | null) => void;
}

export const useYieldsStore = create<YieldsStore>((set) => ({
  yieldsData: null,
  setYieldsData: (data) => set({ yieldsData: data }),
}));
