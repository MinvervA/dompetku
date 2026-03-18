import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await api.get(`/transaction`);
      return res.data.data;
    },
  });
};
