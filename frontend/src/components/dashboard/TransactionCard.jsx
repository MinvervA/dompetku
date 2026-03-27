import {
  Briefcase,
  Car,
  Gamepad2,
  Heart,
  MoreHorizontal,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

const iconMap = {
  food: UtensilsCrossed,
  transport: Car,
  bills: Zap,
  shopping: ShoppingBag,
  salary: Briefcase,
  health: Heart,
  entertainment: Gamepad2,
  freelance: Wrench,
  others: MoreHorizontal,
};

const formatRupiah = (nominal) => {
  return "Rp " + nominal.toLocaleString("id-ID");
};

export const TransactionCard = ({ transactions, isLoading }) => {
  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 bg-gray-300" />
        </CardHeader>
        <CardContent className={"flex flex-col gap-3"}>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-12 w-full bg-gray-300" />
          ))}
        </CardContent>
      </Card>
    );

  if (!transactions || transactions.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Belum ada transaksi</p>
        </CardContent>
      </Card>
    );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaksi</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.slice(0, 5).map((item, index) => {
          const IconComponent = iconMap[item?.category?.icon] ?? MoreHorizontal;
          const isIncome = item.type === "INCOME";

          return (
            <div className="" key={index}>
              <div className={`mb-5 flex gap-2`}>
                <div
                  className={`${isIncome ? "text-green-600 bg-green-50 border-green-200" : "text-red-600 bg-red-50 border-red-200"} font-bold p-2 w-fit border-black border`}
                >
                  <IconComponent className={`w-6 h-6`} />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="">
                    <div className="flex items-center gap-2">
                      <div className="font-bold">{item.description}</div>
                      <div className="">
                        <Badge
                          variant={"outline"}
                          className={"text-blue-500 border-blue-500 border"}
                        >
                          {item?.category?.name}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-mute-foreground">
                      {item?.date
                        ? new Date(item.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </div>
                  </div>
                  <div
                    className={`${isIncome ? "text-green-600" : "text-red-600"} font-bold`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatRupiah(item?.amount)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
