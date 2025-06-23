import { create } from "zustand";
import { login, signup, getMe, google } from "../api/auth.js";

export const useUserStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  signupUser: async ({ username, password }) => {
    try {
      const res = await signup({ username, password });
      const data = res.data;
      if (data.success) {
        const loginRes = await get().loginUser({ username, password });
        return loginRes.success
          ? {
              success: true,
              message: "User registered and logged in successfully",
            }
          : {
              success: false,
              message:
                loginRes.message || "Registration successful but login failed",
            };
      } else {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  loginUser: async ({ username, password }) => {
    try {
      const res = await login({ username, password });
      const data = res.data;
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        set({ user: data.user, token: data.token });
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server error" };
    }
  },

  logoutUser: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  fetchUserFromToken: async () => {
    const token = get().token;
    if (!token) return;

    try {
      const res = await getMe();
      const data = res.data;
      if (data.success) {
        set({ user: data.user });
      } else {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      }
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },

  loginWithGoogle: async (googleToken) => {
    try {
      const res = await google(googleToken);
      const data = res.data;
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        set({ user: data.user, token: data.token });
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: data.message || "Login Failed" };
      }
    } catch (error) {
      return { success: false, message: error.message || "Server Error" };
    }
  }
}));
