import { Router } from "express";
import {
  createTransaction,
  getTransaction,
} from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getTransaction);
router.post("/", authMiddleware, createTransaction);

export const transactionRoute = router;

/*
REST convention yang benar:
```
GET    /api/transactions      ← bukan /getAllTransaction
POST   /api/transactions      ← bukan /createTransaction
GET    /api/transactions/:id  ← bukan /getTransactionById
PUT    /api/transactions/:id  ← bukan /updateTransaction
DELETE /api/transactions/:id  ← bukan /deleteTransaction
*/
