import { create } from "zustand";

type SelectedPrefecturesStore = {
  selectedPrefectures: number[];
  togglePrefecture: (prefCode: number) => void;
};

const defaultPrefCode = 33; // 岡山県

export const useSelectedPrefecturesStore = create<SelectedPrefecturesStore>(
  (set) => ({
    selectedPrefectures: [defaultPrefCode],
    togglePrefecture: (prefCode: number) =>
      set((state) => {
        const index = state.selectedPrefectures.indexOf(prefCode);
        if (index !== -1) {
          return {
            selectedPrefectures: state.selectedPrefectures.filter(
              (code) => code !== prefCode
            ),
          };
        } else {
          return {
            selectedPrefectures: [...state.selectedPrefectures, prefCode],
          };
        }
      }),
  })
);
