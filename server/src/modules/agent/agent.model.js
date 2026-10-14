import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    // ==========================================
    // BASIC INFO — filled at signup
    // ==========================================

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["agent"],
      default: "agent",
    },

    // ==========================================
    // PROFILE — filled later in dashboard
    // ==========================================

    profileImage: {
      type: String,
      default: "",
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationBadge: {
      type: String,
      default: null,
    },

    title: {
      type: String,
      default: "Property Consultant",
    },

    company: {
      name: {
        type: String,
        default: "",
        trim: true,
      },
      logo: {
        type: String,
        default: null,
      },
    },

    country: {
      name: { type: String, trim: true },
      code: { type: String, trim: true },
      flag: { type: String, default: null },
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    languages: [{ type: String, trim: true }],
    badges:    [{ type: String, trim: true }],
    specialties: [{ type: String, trim: true }],

    listings: {
      forSale: { type: Number, default: 0 },
      forRent: { type: Number, default: 0 },
    },

    contact: {
      phone:    { type: String, trim: true },
      whatsapp: { type: String, trim: true },
      email:    { type: String, trim: true, lowercase: true },
    },

    actions: {
      canScheduleTour: { type: Boolean, default: true },
      canWhatsApp:     { type: Boolean, default: true },
      canCall:         { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;