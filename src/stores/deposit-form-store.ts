import { create } from "zustand";

export interface YieldsData {
  liq: string;
  amount: string;
}

export interface YieldsStore {
  yieldsData: YieldsData | null;
  setYieldsData: (data: YieldsData | null) => void;
}

export const useYieldsStore = create<YieldsStore>((set) => ({
  yieldsData: null,
  setYieldsData: (data) => set({ yieldsData: data }),
}));
