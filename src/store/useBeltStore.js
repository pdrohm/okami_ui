import { create } from 'zustand';
import beltService from '../services/beltService';

export const useBeltStore = create((set) => ({
  adultBelts: [],
  kidsBelts: [],
  fetchBelts: async () => {
    try {
      const beltsData = await beltService.getBelts();
      set({
        adultBelts: beltsData.adultBelts,
        kidsBelts: beltsData.kidsBelts,
      });
    } catch (error) {
      console.error('Erro ao buscar faixas:', error);
    }
  },
}));