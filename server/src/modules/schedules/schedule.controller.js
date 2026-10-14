import * as scheduleService from "./schedule.service.js";

export const getSchedules = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const schedules = await scheduleService.getAllSchedules(filter);
    res.status(200).json({ success: true, count: schedules.length, data: schedules });
  } catch (error) {
    next(error);
  }
};

export const getSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

export const createSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.createSchedule(req.body);
    res.status(201).json({ success: true, message: "Schedule created successfully", data: schedule });
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.updateSchedule(req.params.id, req.body);
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }
    res.status(200).json({ success: true, message: "Schedule updated successfully", data: schedule });
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.deleteSchedule(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }
    res.status(200).json({ success: true, message: "Schedule deleted successfully" });
  } catch (error) {
    next(error);
  }
};
