import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useTrend = (period) => {
  return useQuery({
    queryKey: ["trend", period],
    queryFn: async () => {
      const res = await api.get(`/transactions/trend?period=${period}`);
      return res.data.data;
    },
  });
};
