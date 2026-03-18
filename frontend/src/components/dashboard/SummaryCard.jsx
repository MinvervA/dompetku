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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {cards.map((card) => (
        <Card key={card.label}>
          {/* <CardHeader> */}
          {/* </CardHeader> */}
          <CardContent>
            <div className="pt-6">
              <div className="">
                {isLoading ? (
                  <div className="">
                    <Skeleton className={"h-12 w-12 rounded-full"} />
                    <Skeleton className={"h-12 w-12 rounded-full"} />
                  </div>
                ) : (
                  <div className="">
                    <div className={`p-2 ${card.color} w-fit rounded-md`}>
                      <card.icon size={30} />
                    </div>
                    <CardTitle className="text-lg">{card.label}</CardTitle>
                  </div>
                )}
              </div>
              <div
                className={`mt-3 text-2xl font-extrabold ${card.colorMoney}`}
              >
                Rp{" "}
                {isLoading ? (
                  <Skeleton className={"h-4 w-[150px]"} />
                ) : (
                  (card.value?.toLocaleString("id-ID") ?? 0)
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
