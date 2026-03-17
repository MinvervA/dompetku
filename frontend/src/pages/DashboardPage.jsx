import { useCategoriesExpense } from "@/hooks/useCategories";
import { useSummary } from "@/hooks/useSummary";
import { useTransactions } from "@/hooks/useTransaction";
import { useTrend } from "@/hooks/useTrend";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

export const DashboardPage = () => {
  const date = new Date();

  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [period, setPeriod] = useState("1m");

  const { data: summary, isLoading: loadingSummary } = useSummary(month, year);
  const { data: transaction, isLoading: loadingTransaction } =
    useTransactions();
  const { data: categoryData, isLoading: loadingCategoryData } =
    useCategoriesExpense(month, year);
  const { data: trend, isLoading: loadingTrend } = useTrend(period);

  const { user, logout } = useAuthStore();

  return <div className=""></div>;
};
