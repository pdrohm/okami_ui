import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGlobalSettings = create(
  persist(
    (set) => ({
      darkTheme: false,
      showLeftPanel: true, 
      setDarkTheme: (isDark) => set({ darkTheme: isDark }),
      toggleDarkTheme: () =>
        set((state) => ({ darkTheme: !state.darkTheme })),
      setShowLeftPanel: (isVisible) => set({ showLeftPanel: isVisible }),
      toggleLeftPanel: () =>
        set((state) => ({ showLeftPanel: !state.showLeftPanel })),
    }),
    {
      name: "global-settings", 
    }
  )
);