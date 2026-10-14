import Lead from "./lead.model.js";

export const getAllLeads = async (filter = {}) => {
  return await Lead.find(filter).sort({ createdAt: -1 });
};

export const getLeadById = async (id) => {
  return await Lead.findById(id);
};

export const createLead = async (leadData) => {
  return await Lead.create(leadData);
};

export const updateLead = async (id, updateData) => {
  return await Lead.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const deleteLead = async (id) => {
  return await Lead.findByIdAndDelete(id);
};
