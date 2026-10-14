import * as chatService from "./chat.service.js";

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await chatService.getConversations();
    res.status(200).json({ success: true, count: conversations.length, data: conversations });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID is required" });
    }
    const messages = await chatService.getMessagesBySession(sessionId);
    const conversation = await chatService.getConversationBySession(sessionId);
    res.status(200).json({ success: true, count: messages.length, data: messages, conversation });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { sessionId, sender, senderName, text, userName, userEmail, userPhone, avatar } = req.body;

    if (!sessionId || !text || !sender) {
      return res.status(400).json({
        success: false,
        message: "sessionId, sender, and text are required",
      });
    }

    const result = await chatService.sendMessage({
      sessionId,
      sender,
      senderName,
      text,
      userName,
      userEmail,
      userPhone,
      avatar,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: result.message,
      conversation: result.conversation,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { reader = "agent" } = req.body;
    await chatService.markAsRead(sessionId, reader);
    res.status(200).json({ success: true, message: "Conversation marked as read" });
  } catch (error) {
    next(error);
  }
};
