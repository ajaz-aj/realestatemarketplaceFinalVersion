import Analytics from "./analytics.model.js";

export const getAnalyticsData = async (type = "general") => {
  let data = await Analytics.findOne({ type });
  return data;
};

export const updateAnalyticsData = async (type = "general", updateData = {}) => {
  return await Analytics.findOneAndUpdate(
    { type },
    { $set: updateData },
    { new: true, upsert: true }
  );
};
