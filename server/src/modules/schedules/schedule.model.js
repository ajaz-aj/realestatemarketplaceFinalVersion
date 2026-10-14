import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
      default: "10:00 AM",
    },
    day: {
      type: String,
      default: "Today",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Pending", "Completed", "Cancelled"],
      default: "Confirmed",
    },
    price: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "Villa",
    },
    location: {
      type: String,
      default: "Bangalore",
    },
    images: {
      type: [String],
      default: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"],
    },
    imageCount: {
      type: Number,
      default: 1,
    },
    client: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, default: "" },
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      default: null,
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

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
