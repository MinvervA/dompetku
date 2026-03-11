import api from "../api/axios.js";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,

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
      const token = localStorage.getItem("token");
      if (!token) {
        set({ user: null, token: null });
        return;
      }
      const res = await api.get("/auth/me");
      set({
        user: res.data.data,
        token,
      });
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
      });
    }
  },
}));
