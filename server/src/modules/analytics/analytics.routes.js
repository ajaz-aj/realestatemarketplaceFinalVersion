import express from "express";
import { getAnalytics, updateAnalytics } from "./analytics.controller.js";

const router = express.Router();

router.get("/", getAnalytics);
router.post("/", updateAnalytics);
router.put("/", updateAnalytics);

export default router;
