import InvestmentPortfolio from "./investmentPortfolio.model.js";
import {
  createInvestment,
  getAllInvestments,
  getMyInvestments,
  getInvestmentById,
  updateInvestment,
  cancelInvestment,
} from "./investment.service.js";

export const getPortfolios = async (req, res, next) => {
  try {
    const portfolios = await InvestmentPortfolio.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json({ success: true, count: portfolios.length, data: portfolios });
  } catch (error) {
    next(error);
  }
};

export const createPortfolio = async (req, res, next) => {
  try {
    const portfolio = await InvestmentPortfolio.create(req.body);
    res.status(201).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

export const createInvestmentController = async (
  req,
  res
) => {
  try {
    const investment = await createInvestment(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Investment created successfully",
      data: investment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInvestments = async (req, res) => {
  try {
    const investments = await getAllInvestments();

    res.status(200).json({
      success: true,
      data: investments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyInvestmentList = async (
  req,
  res
) => {
  try {
    const investments = await getMyInvestments(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: investments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInvestment = async (req, res) => {
  try {
    const investment = await getInvestmentById(
      req.params.investmentId
    );

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: investment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInvestmentController = async (
  req,
  res
) => {
  try {
    const investment = await updateInvestment(
      req.params.investmentId,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Investment updated successfully",
      data: investment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelInvestmentController = async (
  req,
  res
) => {
  try {
    const investment = await cancelInvestment(
      req.params.investmentId,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Investment cancelled successfully",
      data: investment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};