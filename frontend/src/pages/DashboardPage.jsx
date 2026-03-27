import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { TransactionCard } from "@/components/dashboard/TransactionCard";
import { useCategoriesExpense } from "@/hooks/useCategories";
import { useSummary } from "@/hooks/useSummary";
import { useTransactions } from "@/hooks/useTransaction";
import { useTrend } from "@/hooks/useTrend";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

export const DashboardPage = () => {
  const date = new Date();
  const { user, logout } = useAuthStore();

  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [period, setPeriod] = useState("1m");
  const { data: summary, isLoading: loadingSummary } = useSummary(month, year);
  const { data: transaction, isLoading: loadingTransaction } =
    useTransactions();
  const { data: categoryData, isLoading: loadingCategoryData } =
    useCategoriesExpense(month, year);
  const { data: trend, isLoading: loadingTrend } = useTrend(period);

  return (
    <div className="p-6 flex flex-col gap-6 w-full h-screen">
      <div className="">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang, {user?.name}</p>
      </div>

      <div className="w-full">
        <SummaryCard isLoading={loadingSummary} summary={summary} />
      </div>
      <div className="">
        <TransactionCard
          transactions={transaction}
          isLoading={loadingTransaction}
        />
      </div>
    </div>
  );
};
