import { create } from "zustand";
import apiRequest from "./apiRequest";
import axios from "axios";
export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await axios.get(
      "http://localhost:8800/api/users/notifications",
      {
        withCredentials: true,
      }
    );
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
