import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: "Just now",
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    location: {
      type: String,
      default: "Beverly Hills",
    },
    soldDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
