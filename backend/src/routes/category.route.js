import { Router } from "express";
import { getCategories } from "../controllers/category.controller.js";

const router = Router();

router.use("/", getCategories);

export const categoriesRoute = router;
