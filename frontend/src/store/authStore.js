import api from "../api/axios.js";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isLoading: true,

  login: (user, token) => {
    localStorage.setItem("token", token);
    set({
      user,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
    });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem("token");
      if (!token) {
        set({ user: null, token: null, isLoading: false });
        return;
      }
      const res = await api.get("/auth/me");
      set({
        user: res.data.data,
        token,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        isLoading: false,
      });
    }
  },
}));
