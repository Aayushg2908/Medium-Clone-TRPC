import { create } from "zustand";

interface BearState {
  someOneCommented: boolean;
  setSomeOneCommented: () => void;
}

export const useCommentStore = create<BearState>()((set) => ({
  someOneCommented: false,
  setSomeOneCommented: () =>
    set((state) => ({ someOneCommented: !state.someOneCommented })),
}));
