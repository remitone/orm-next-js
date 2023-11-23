import { create } from "zustand";
import { Remitter } from "@/types/remitter";

type Action = {
  setRemitter: (remitter: Remitter) => void;
};
type RemitterState = {
  remitter: Remitter | null;
};
export const useRemitterStore = create<RemitterState & Action>()((set) => ({
  remitter: null,
  setRemitter: (remitter: Remitter) =>
    set((state) => ({ ...state, remitter: remitter })),
}));
