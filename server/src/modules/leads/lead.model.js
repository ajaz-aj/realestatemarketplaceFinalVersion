import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    citizenship: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    property: {
      name: { type: String, default: "" },
      price: { type: String, default: "" },
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Property", default: null },
    },
    budget: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "Website",
    },
    priority: {
      type: String,
      enum: ["High", "High Priority", "Medium", "Low"],
      default: "Medium",
    },
    stage: {
      type: String,
      enum: ["New", "Interested", "Site Visit", "Negotiation", "Contacted", "Converted"],
      default: "New",
    },
    status: {
      type: String,
      default: "New",
    },
    followUp: {
      type: String,
      default: "Today",
    },
    lastContact: {
      type: String,
      default: "Today",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
