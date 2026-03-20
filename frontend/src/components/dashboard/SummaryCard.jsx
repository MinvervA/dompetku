import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const SummaryCard = ({ summary, isLoading }) => {
  const cards = [
    {
      label: "Saldo",
      value: summary?.balance,
      icon: Wallet,
      color: "bg-blue-200",
      colorMoney: "text-green-500",
    },
    {
      label: "Pemasukan",
      value: summary?.totalIncome,
      icon: TrendingUp,
      color: "bg-yellow-200",
      colorMoney: "text-green-600",
    },
    {
      label: "Pengeluaran",
      value: summary?.totalExpense,
      icon: TrendingDown,
      color: "bg-red-200",
      colorMoney: "text-red-600",
    },
  ];
  console.log(isLoading);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 w-full">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent>
            <div className="pt-6">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-12 rounded-md bg-gray-300" />
                  <Skeleton className="h-5 w-24 bg-gray-300" />
                  <Skeleton className="h-8 w-[150px] bg-gray-300" />
                </div>
              ) : (
                <>
                  <div className={`p-2 ${card.color} w-fit rounded-md`}>
                    <card.icon size={30} />
                  </div>
                  <CardTitle className="text-lg mt-3">{card.label}</CardTitle>
                  <div
                    className={`mt-3 text-2xl font-extrabold ${card.colorMoney}`}
                  >
                    Rp {card.value?.toLocaleString("id-ID") ?? 0}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
