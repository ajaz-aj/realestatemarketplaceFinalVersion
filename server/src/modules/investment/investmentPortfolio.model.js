import mongoose from "mongoose";

const investmentPortfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    expectedYield: {
      type: String,
      default: "12-16% IRR",
    },
    minInvestment: {
      type: String,
      default: "₹25 Lakh",
    },
    assetClass: {
      type: String,
      default: "Ultra-Luxury Real Estate",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const InvestmentPortfolio = mongoose.model(
  "InvestmentPortfolio",
  investmentPortfolioSchema
);

export default InvestmentPortfolio;
