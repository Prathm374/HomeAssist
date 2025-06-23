import { create } from 'zustand';
import { createOrder, getOrders, updateOrder, cancelOrder, completeOrder } from '../api/orders.js';

export const useOrderStore = create((set) => ({
    orders: [],

    fetchOrders: async () => {
        const res = await getOrders();
        set({ orders: res.data.data });
    },

    placeOrder: async (orderData, userId) => {
        await createOrder(orderData);
        await useOrderStore.getState().fetchOrders(userId);
    },

    editOrder: async (orderId, orderData, userId) => {
        await updateOrder(orderId, orderData);
        await useOrderStore.getState().fetchOrders(userId);
    },

    cancelOrder: async (orderId, userId) => {
        await cancelOrder(orderId);
        await useOrderStore.getState().fetchOrders(userId);
    },

    completeOrder: async (orderId, userId) => {
        await completeOrder(orderId);
        await useOrderStore.getState().fetchOrders(userId);
    }
}));