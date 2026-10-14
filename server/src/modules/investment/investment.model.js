import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    investmentType: {
      type: String,
      enum: ["full", "partial"],
      default: "partial",
    },

    status: {
      type: String,
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },

    expectedReturn: {
      type: Number,
      default: 0,
    },

    investmentDate: {
      type: Date,
      default: Date.now,
    },

    completedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Investment = mongoose.model(
  "Investment",
  investmentSchema
);

export default Investment;