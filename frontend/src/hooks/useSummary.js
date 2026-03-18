import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useSummary = (month, year) => {
  return useQuery({
    queryKey: ["summary", month, year],
    // kalau month/year berubah, otomatis refetch
    queryFn: async () => {
      const res = await api.get(
        `/transaction/summary?month=${month}&year=${year}`,
      );
      console.log(res);

      return res.data.data;
    },
  });
};
