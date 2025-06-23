import { create } from 'zustand';
import {
  fetchAdminStats,
  getAllUsers, updateUserById, deleteUserById,
  getAllOrders, updateOrderById, deleteOrderById,
  getAllServices, updateServiceById, deleteServiceById
} from '../api/admin.js';

export const useAdminStore = create((set) => ({
  stats: null,
  users: [],
  orders: [],
  services: [],

  loadStats: async () => {
    const res = await fetchAdminStats();
    set({ stats: res.data.data });
  },

  loadUsers: async () => {
    const res = await getAllUsers();
    set({ users: res.data.data });
  },
  updateUser: async (id, data) => {
    await updateUserById(id, data);
    await useAdminStore.getState().loadUsers();
  },
  deleteUser: async (id) => {
    await deleteUserById(id);
    await useAdminStore.getState().loadUsers();
  },

  loadOrders: async () => {
    const res = await getAllOrders();
    set({ orders: res.data.data });
  },
  updateOrder: async (id, data) => {
    await updateOrderById(id, data);
    await useAdminStore.getState().loadOrders();
  },
  deleteOrder: async (id) => {
    await deleteOrderById(id);
    await useAdminStore.getState().loadOrders();
  },

  loadServices: async () => {
    const res = await getAllServices();
    set({ services: res.data.data });
  },
  updateService: async (id, data) => {
    await updateServiceById(id, data);
    await useAdminStore.getState().loadServices();
  },
  deleteService: async (id) => {
    await deleteServiceById(id);
    await useAdminStore.getState().loadServices();
  },
}));
