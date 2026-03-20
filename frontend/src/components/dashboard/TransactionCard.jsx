import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const TransactionCard = ({ transaction, isLoading }) => {
  console.log(transaction);
  console.log(isLoading);

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
      </CardContent>
    </Card>
  );
};
