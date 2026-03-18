import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useCategoriesExpense = (month, year) => {
  return useQuery({
    queryKey: ["categories-expense", month, year],
    queryFn: async () => {
      const res = await api.get(
        `/transaction/by-category?month=${month}&year=${year}`,
      );
      return res.data.data;
    },
  });
};
