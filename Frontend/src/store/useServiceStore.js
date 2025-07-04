import { create } from "zustand";
import { getServices } from "../api/service.js";

export const useServiceStore = create((set) => ({
  services: [],

  fetchServices: async () => {
    try {
      const res = await getServices();
      const data = res.data;
      if (data.success) {
        set({ services: data.data });
        return {
          success: true,
          message: data.message || "Services fetched successfully",
        };
      } else {
        set({ services: [] });
        return {
          success: false,
          message: data.message || "Failed to fetch services",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
}));
