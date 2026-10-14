import Investment from "./investment.model.js";
import Property from "../property/property.model.js";

export const createInvestment = async (
  userId,
  investmentData
) => {
  const property = await Property.findById(
    investmentData.property
  );

  if (!property) {
    throw new Error("Property not found");
  }

  if (investmentData.amount <= 0) {
    throw new Error("Investment amount must be greater than 0");
  }

  const investment = await Investment.create({
    investor: userId,
    property: investmentData.property,
    amount: investmentData.amount,
    investmentType:
      investmentData.investmentType || "partial",
  });

  return investment;
};

export const getAllInvestments = async () => {
  const investments = await Investment.find()
    .populate("investor", "fullName email")
    .populate("property");

  return investments;
};

export const getMyInvestments = async (userId) => {
  const investments = await Investment.find({
    investor: userId,
  }).populate("property");

  return investments;
};

export const getInvestmentById = async (
  investmentId
) => {
  const investment = await Investment.findById(
    investmentId
  )
    .populate("investor", "fullName email")
    .populate("property");

  return investment;
};

export const updateInvestment = async (
  investmentId,
  userId,
  updateData
) => {
  const investment = await Investment.findOne({
    _id: investmentId,
    investor: userId,
  });

  if (!investment) {
    throw new Error(
      "Investment not found or you are not the investor"
    );
  }

  if (investment.status === "completed") {
    throw new Error(
      "Completed investment cannot be updated"
    );
  }

  if (investment.status === "cancelled") {
    throw new Error(
      "Cancelled investment cannot be updated"
    );
  }

  Object.assign(investment, updateData);

  await investment.save();

  return investment;
};

export const cancelInvestment = async (
  investmentId,
  userId
) => {
  const investment = await Investment.findOne({
    _id: investmentId,
    investor: userId,
  });

  if (!investment) {
    throw new Error("Investment not found");
  }

  if (investment.status === "completed") {
    throw new Error(
      "Completed investment cannot be cancelled"
    );
  }

  investment.status = "cancelled";

  await investment.save();

  return investment;
};