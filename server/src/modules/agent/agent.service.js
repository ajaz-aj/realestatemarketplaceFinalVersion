import Agent from "./agent.model.js";

// ==========================================
// CREATE AGENT
// ==========================================

export const createAgent = async (agentData) => {
  const agent = await Agent.create(agentData);

  return agent;
};


// ==========================================
// GET ALL AGENTS
// ==========================================

export const getAllAgents = async () => {
  const agents = await Agent.find()
    .sort({ createdAt: -1 });

  return agents;
};


// ==========================================
// GET AGENT BY ID
// ==========================================

export const getAgentById = async (id) => {
  const agent = await Agent.findById(id);

  return agent;
};


// ==========================================
// UPDATE AGENT
// ==========================================

export const updateAgent = async (
  id,
  agentData
) => {
  const agent = await Agent.findByIdAndUpdate(
    id,
    agentData,
    {
      new: true,
      runValidators: true,
    }
  );

  return agent;
};


// ==========================================
// DELETE AGENT
// ==========================================

export const deleteAgent = async (id) => {
  const agent = await Agent.findByIdAndDelete(id);

  return agent;
};