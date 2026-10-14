import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ["user", "agent", "advisor"],
      required: true,
    },
    senderName: {
      type: String,
      default: "User",
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      default: () =>
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userName: {
      type: String,
      default: "Prospective Investor",
      trim: true,
    },
    userEmail: {
      type: String,
      default: "",
      trim: true,
    },
    userPhone: {
      type: String,
      default: "",
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    unreadByAgent: {
      type: Number,
      default: 0,
    },
    unreadByUser: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    assignedAdvisor: {
      type: String,
      default: "Sarah Williams",
    },
  },
  {
    timestamps: true,
  }
);

export const ChatMessage = mongoose.model("ChatMessage", messageSchema);
export const Conversation = mongoose.model("Conversation", conversationSchema);
