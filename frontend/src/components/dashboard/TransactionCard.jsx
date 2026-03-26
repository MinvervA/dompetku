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

export const TransactionCard = ({ transaction, isLoading }) => {
  console.log(transaction);
  console.log(isLoading);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaksi</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="">
          <div
            className={`p-2 ${transaction.type === "INCOME" ? "bg-green-400" : "bg-red-400"}`}
          >
            <transaction.category.icon />
          </div>
        </div> */}
        {transaction?.map((item, index) => {
          const IconComponent = iconMap[item.category.icon] ?? MoreHorizontal;
          const isIncome = item.type === "INCOME";
          console.log(item.category.icon);

          return (
            <div className="" key={index}>
              <div className={`mb-5 flex gap-2`}>
                <div
                  className={`${isIncome ? "text-green-600" : "text-red-600"} font-bold p-2 w-fit border-black border`}
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
                    <div className="text-sm">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
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
