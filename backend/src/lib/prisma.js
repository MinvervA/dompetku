import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    transaction: {
      amount: {
        needs: { amount: true },
        compute(data) {
          return parseFloat(data.amount);
        },
      },
    },
  },
});

export default prisma;
