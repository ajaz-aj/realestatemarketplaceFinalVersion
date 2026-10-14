import express from "express";
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
} from "./lead.controller.js";

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLead);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
