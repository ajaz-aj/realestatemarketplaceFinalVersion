import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "general",
      unique: true,
    },
    metrics: {
      type: Object,
      default: {},
    },
    viewsInquiries: {
      type: Array,
      default: [],
    },
    marketingChannels: {
      type: Array,
      default: [],
    },
    insightText: {
      type: Object,
      default: {},
    },
    funnelStages: {
      type: Array,
      default: [],
    },
    topProperties: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
