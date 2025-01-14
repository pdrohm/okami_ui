import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCheckinStore = create(
  persist(
    (set) => ({
      selectedModality: null,
      selectedClass: null,
      setSelectedModality: (modality) => set({ selectedModality: modality }),
      setSelectedClass: (classInfo) => set({ selectedClass: classInfo }),
    }),
    {
      name: "checkin-storage",
    }
  )
);