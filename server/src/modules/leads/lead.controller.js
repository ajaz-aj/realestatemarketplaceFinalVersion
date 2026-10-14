import * as leadService from "./lead.service.js";

export const getLeads = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.priority) {
      if (req.query.priority === "high") {
        filter.priority = { $in: ["High", "High Priority"] };
      } else {
        filter.priority = req.query.priority;
      }
    }
    if (req.query.stage) {
      filter.stage = req.query.stage;
    }
    const leads = await leadService.getAllLeads(filter);
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    next(error);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ success: true, message: "Lead created successfully", data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, message: "Lead updated successfully", data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await leadService.deleteLead(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    next(error);
  }
};
