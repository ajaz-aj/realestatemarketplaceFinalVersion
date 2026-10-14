import { ChatMessage, Conversation } from "./chat.model.js";

export const getConversations = async () => {
  return await Conversation.find().sort({ lastMessageAt: -1 });
};

export const getConversationBySession = async (sessionId) => {
  return await Conversation.findOne({ sessionId });
};

export const getMessagesBySession = async (sessionId) => {
  let messages = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });

  // If no messages yet for this session, seed Sarah's welcome message
  if (messages.length === 0) {
    const welcome = await ChatMessage.create({
      sessionId,
      sender: "advisor",
      senderName: "Sarah Williams",
      text: "Hello! 👋 Welcome To Luxe Realty. I'm Sarah, Your Dedicated Investment Advisor. How Can I Help You Today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    await Conversation.findOneAndUpdate(
      { sessionId },
      {
        $setOnInsert: {
          sessionId,
          userName: "Prospective Investor",
          lastMessage: welcome.text,
          lastMessageAt: new Date(),
          status: "active",
          assignedAdvisor: "Sarah Williams",
        },
      },
      { upsert: true, new: true }
    );

    messages = [welcome];
  }

  return messages;
};

export const sendMessage = async ({
  sessionId,
  sender,
  senderName,
  text,
  userName,
  userEmail,
  userPhone,
  avatar,
}) => {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const message = await ChatMessage.create({
    sessionId,
    sender,
    senderName: senderName || (sender === "user" ? userName || "User" : "Sarah Williams"),
    text,
    time,
  });

  const isUser = sender === "user";

  const convUpdate = {
    lastMessage: text,
    lastMessageAt: new Date(),
  };

  if (userName) convUpdate.userName = userName;
  if (userEmail) convUpdate.userEmail = userEmail;
  if (userPhone) convUpdate.userPhone = userPhone;
  if (avatar) convUpdate.avatar = avatar;

  const incUpdate = isUser ? { unreadByAgent: 1 } : { unreadByUser: 1 };

  const conversation = await Conversation.findOneAndUpdate(
    { sessionId },
    {
      $set: convUpdate,
      $inc: incUpdate,
      $setOnInsert: {
        sessionId,
        userName: userName || "Prospective Investor",
        status: "active",
        assignedAdvisor: "Sarah Williams",
      },
    },
    { upsert: true, new: true }
  );

  return { message, conversation };
};

export const markAsRead = async (sessionId, reader = "agent") => {
  if (reader === "agent") {
    await Conversation.findOneAndUpdate({ sessionId }, { $set: { unreadByAgent: 0 } });
    await ChatMessage.updateMany({ sessionId, sender: "user" }, { $set: { read: true } });
  } else {
    await Conversation.findOneAndUpdate({ sessionId }, { $set: { unreadByUser: 0 } });
    await ChatMessage.updateMany({ sessionId, sender: { $ne: "user" } }, { $set: { read: true } });
  }
};
