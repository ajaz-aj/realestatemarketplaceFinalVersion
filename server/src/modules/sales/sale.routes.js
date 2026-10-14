import express from "express";
import { getSales, createSale } from "./sale.controller.js";

const router = express.Router();

router.get("/", getSales);
router.post("/", createSale);

export default router;
