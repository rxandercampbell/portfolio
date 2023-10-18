import { defineStore } from 'pinia';
import { api } from 'boot/axios.js';

export const useRarocStore = defineStore({
  id: 'rarocStore',
  state: () => ({
    rarocData: [],
  }),
  actions: {
    async getRarocData() {
      const response = await api.get('/api/RarocData')
      return response.data;
    }
  }
});
