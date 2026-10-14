import mongoose from "mongoose";

const rentPhotoSchema = new mongoose.Schema(
  {
    // Card title — e.g. "Waterfront Retreats", "Urban Penthouses"
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary image URL for the card background
    image: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional subtitle/description
    // e.g. "Available for immediate occupancy and long-term stays."
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Card layout size — controls grid placement
    // "large" = big featured card, "small" = stacked card
    size: {
      type: String,
      enum: ["large", "small"],
      default: "small",
    },

    // Optional badge (e.g. "New", "Featured") — not shown in current design
    // but kept for future use
    badge: {
      type: String,
      default: "",
      trim: true,
    },

    // Display order within the collection grid
    displayOrder: {
      type: Number,
      default: 0,
    },

    // Show/hide this card
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const RentPhoto = mongoose.model("RentPhoto", rentPhotoSchema);

export default RentPhoto;