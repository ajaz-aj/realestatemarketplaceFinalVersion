import mongoose from "mongoose";

const featuredCollectionSchema = new mongoose.Schema(
  {
    // Collection title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary image URL
    image: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional badge
    // Example: "Curated"
    badge: {
      type: String,
      default: "",
      trim: true,
    },

    // Optional description/subtitle
    // Example: "Prime Coastal Locations With Private Docks"
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Card size in the UI
    size: {
      type: String,
      enum: ["large", "small"],
      default: "small",
    },

    // Used to control display order
    displayOrder: {
      type: Number,
      default: 0,
    },

    // Whether to show this collection
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FeaturedCollection = mongoose.model(
  "FeaturedCollection",
  featuredCollectionSchema
);

export default FeaturedCollection;