import express from "express";

import {
  createAgent,
  getAgents,
  getAgent,
  updateAgent,
  deleteAgent,
} from "./agent.controller.js";

const router = express.Router();


// ==========================================
// GET ALL AGENTS
// ==========================================

router.get("/", getAgents);


// ==========================================
// GET SINGLE AGENT
// ==========================================

router.get("/:id", getAgent);


// ==========================================
// CREATE AGENT
// ==========================================

router.post("/", createAgent);


// ==========================================
// UPDATE AGENT
// ==========================================

router.put("/:id", updateAgent);


// ==========================================
// DELETE AGENT
// ==========================================

router.delete("/:id", deleteAgent);


export default router;