import * as analyticsService from "./analytics.service.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const type = req.query.type || "general";
    const data = await analyticsService.getAnalyticsData(type);
    res.status(200).json({ success: true, data: data || {} });
  } catch (error) {
    next(error);
  }
};

export const updateAnalytics = async (req, res, next) => {
  try {
    const type = req.body.type || "general";
    const updated = await analyticsService.updateAnalyticsData(type, req.body);
    res.status(200).json({ success: true, message: "Analytics updated successfully", data: updated });
  } catch (error) {
    next(error);
  }
};
