import Schedule from "./schedule.model.js";

export const getAllSchedules = async (filter = {}) => {
  return await Schedule.find(filter).sort({ createdAt: -1 });
};

export const getScheduleById = async (id) => {
  return await Schedule.findById(id);
};

export const createSchedule = async (data) => {
  return await Schedule.create(data);
};

export const updateSchedule = async (id, data) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteSchedule = async (id) => {
  return await Schedule.findByIdAndDelete(id);
};
