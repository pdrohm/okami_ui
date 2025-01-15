import { create } from "zustand";
import beltService from "../services/beltService";

export const useBeltStore = create((set) => ({
  adultBelts: [],
  kidsBelts: [],
  degrees: [],
  getBelts: async () => {
    try {
      const { data } = await beltService.getBelts();

      const adultBelts = data.filter((belt) => belt.type === "ADULT");
      const kidsBelts = data.filter((belt) => belt.type === "KID");

      set({
        adultBelts,
        kidsBelts,
      });
    } catch (error) {
      console.error("Erro ao buscar faixas:", error);
    }
  },
  getDegrees: async () => {
    try {
      const { data } = await beltService.getDegrees();

      set({
        degrees: data,
      });
    } catch (error) {
      console.error("Erro ao buscar faixas:", error);
    }
  },
}));
