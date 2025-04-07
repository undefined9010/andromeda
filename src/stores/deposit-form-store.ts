import { create } from "zustand";

export interface YieldsData {
  liq: string | number[] | number | string[];
  amount: string;
  type: "LY" | "FY";
  coinName: string;
}

export interface YieldsStore {
  yieldsData: YieldsData | null;
  setYieldsData: (data: YieldsData | null) => void;
}

export const useYieldsStore = create<YieldsStore>((set) => ({
  yieldsData: null,
  setYieldsData: (data) => set({ yieldsData: data }),
}));
