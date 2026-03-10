import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoute } from "./routes/auth.route.js";
import { categoriesRoute } from "./routes/category.route.js";
import { transactionRoute } from "./routes/transaction.route.js";

// load env data
dotenv.config();

// inisilisasi app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route utama
app.get("/", (req, res) => {
  res.json({
    message: "HELLO This is API DOMPETKU",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/transaction", transactionRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
