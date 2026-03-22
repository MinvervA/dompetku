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
                <div className="flex">
                  <div className="flex items-center">
                    <div className="">{item.description}</div>
                    <div className=""></div>
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
