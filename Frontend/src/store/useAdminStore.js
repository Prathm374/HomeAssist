import { create } from "zustand";
import {
  fetchAdminStats,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getAllOrders,
  updateOrderById,
  deleteOrderById,
  getAllServices,
  updateServiceById,
  deleteServiceById,
} from "../api/admin.js";

export const useAdminStore = create((set) => ({
  stats: null,
  users: [],
  orders: [],
  services: [],

  loadStats: async () => {
    try {
      const res = await fetchAdminStats();
      const data = res.data;
      if (data.success) {
        set({ stats: data.data });
        return {
          success: true,
          message: data.message || "Stats fetched successfully",
        };
      } else {
        set({ stats: null });
        return {
          success: false,
          message: data.message || "Failed to fetch stats",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  loadUsers: async () => {
    try {
      const res = await getAllUsers();
      const data = res.data;
      if (data.success) {
        set({ users: data.data });
        return {
          success: true,
          message: data.message || "Users fetched successfully",
        };
      } else {
        set({ users: [] });
        return {
          success: false,
          message: data.message || "Failed to fetch users",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
  updateUser: async (id, userData) => {
    try {
      const res = await updateUserById(id, userData);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useAdminStore.getState().loadUsers();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "User updated successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message || "User updated but failed to fetch users",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to update user",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
  deleteUser: async (id) => {
    try {
      const res = await deleteUserById(id);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useAdminStore.getState().loadUsers();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "User deleted successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message || "User deleted but failed to fetch users",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to delete user",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  loadOrders: async () => {
    try {
      const res = await getAllOrders();
      const data = res.data;
      if (data.success) {
        set({ orders: data.data });
        return {
          success: true,
          message: data.message || "Orders fetched successfully",
        };
      } else {
        set({ orders: [] });
        return {
          success: false,
          message: data.message || "Failed to fetch orders",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
  updateOrder: async (id, orderData) => {
    try {
      const res = await updateOrderById(id, orderData);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useAdminStore.getState().loadOrders();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "Order updated successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message || "Order updated but failed to fetch orders",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to update order",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
  deleteOrder: async (id) => {
    try {
      const res = await deleteOrderById(id);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useAdminStore.getState().loadOrders();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "Order deleted successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message || "Order deleted but failed to fetch orders",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to delete order",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  loadServices: async () => {
    try {
      const res = await getAllServices();
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
  updateService: async (id, serviceData) => {
    try {
      const res = await updateServiceById(id, serviceData);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useAdminStore.getState().loadServices();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "Service updated successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message ||
              "Service updated but failed to fetch services",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to update service",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
  deleteService: async (id) => {
    try {
      const res = await deleteServiceById(id);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useAdminStore.getState().loadServices();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "Service deleted successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message ||
              "Service deleted but failed to fetch services",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to delete service",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
}));
