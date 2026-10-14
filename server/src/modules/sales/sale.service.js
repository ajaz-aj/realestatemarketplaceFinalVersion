import Sale from "./sale.model.js";

export const getAllSales = async () => {
  return await Sale.find().sort({ createdAt: -1 });
};

export const createSale = async (data) => {
  return await Sale.create(data);
};
