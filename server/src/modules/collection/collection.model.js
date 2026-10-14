import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    // Collection name
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // URL-friendly name
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Small text above/below title
    badge: {
      type: String,
      required: true,
      trim: true,
    },

    // Collection description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary image URL
    image: {
      type: String,
      required: true,
    },

    // Type of collection
    category: {
      type: String,
      enum: [
        "luxury",
        "auction",
        "new-construction",
      ],
      required: true,
    },

    // Number shown on card
    listingCount: {
      type: Number,
      default: 0,
    },

    // Used for "Live Now"
    isLive: {
      type: Boolean,
      default: false,
    },

    // Whether collection should appear on website
    isActive: {
      type: Boolean,
      default: true,
    },

    // Controls card order
    displayOrder: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const Collection = mongoose.model(
  "Collection",
  collectionSchema
);

export default Collection;