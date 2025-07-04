import { create } from "zustand";
import {
  createOrder,
  getOrders,
  updateOrder,
  cancelOrder,
  completeOrder,
} from "../api/orders.js";

export const useOrderStore = create((set) => ({
  orders: [],

  fetchOrders: async () => {
    try {
      const res = await getOrders();
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

  placeOrder: async (orderData) => {
    try {
      const res = await createOrder(orderData);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useOrderStore.getState().fetchOrders();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "Order placed successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message || "Order placed but failed to fetch orders",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to place order",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  editOrder: async (orderId, orderData) => {
    try {
      const res = await updateOrder(orderId, orderData);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useOrderStore.getState().fetchOrders();
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

  cancelOrder: async (orderId) => {
    try {
      const res = await cancelOrder(orderId);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useOrderStore.getState().fetchOrders();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "Order cancelled successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message || "Order cancelled but failed to fetch orders",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to cancel order",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  completeOrder: async (orderId) => {
    try {
      const res = await completeOrder(orderId);
      const data = res.data;
      if (data.success) {
        const fetchRes = await useOrderStore.getState().fetchOrders();
        if (fetchRes.success) {
          return {
            success: true,
            message: data.message || "Order completed successfully",
          };
        } else {
          return {
            success: false,
            message:
              fetchRes.message || "Order completed but failed to fetch orders",
          };
        }
      } else {
        return {
          success: false,
          message: data.message || "Failed to complete order",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },
}));
