import express from "express";
import {
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
} from "./chat.controller.js";

const router = express.Router();

router.get("/conversations", getConversations);
router.get("/messages/:sessionId", getMessages);
router.post("/messages", sendMessage);
router.post("/read/:sessionId", markAsRead);

export default router;
