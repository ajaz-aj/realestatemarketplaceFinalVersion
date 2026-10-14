import * as agentService from "./agent.service.js";


// ==========================================
// CREATE AGENT
// ==========================================

export const createAgent = async (req, res) => {
  try {

    const agentData = req.body;

    const agent =
      await agentService.createAgent(
        agentData
      );

    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      data: agent,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET ALL AGENTS
// ==========================================

export const getAgents = async (req, res) => {
  try {

    const agents =
      await agentService.getAllAgents();

    res.status(200).json({
      success: true,
      data: agents,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET AGENT BY ID
// ==========================================

export const getAgent = async (req, res) => {
  try {

    const agent =
      await agentService.getAgentById(
        req.params.id
      );

    if (!agent) {

      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });

    }

    res.status(200).json({
      success: true,
      data: agent,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// UPDATE AGENT
// ==========================================

export const updateAgent = async (req, res) => {
  try {

    const agent =
      await agentService.updateAgent(
        req.params.id,
        req.body
      );

    if (!agent) {

      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Agent updated successfully",
      data: agent,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// DELETE AGENT
// ==========================================

export const deleteAgent = async (req, res) => {
  try {

    const agent =
      await agentService.deleteAgent(
        req.params.id
      );

    if (!agent) {

      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};