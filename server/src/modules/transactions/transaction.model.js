import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    targetAudience: {
      type: String, // "sellers" | "bidders"
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Learn More",
    },
    buttonAction: {
      type: String,
      default: "/SellOrRentForm",
    },
    steps: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
