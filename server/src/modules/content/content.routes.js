import express from "express";
import { getContentByKey, updateContentByKey } from "./content.controller.js";

const router = express.Router();

router.get("/:key", getContentByKey);
router.post("/:key", updateContentByKey);
router.put("/:key", updateContentByKey);

export default router;
