import Transaction from "./transaction.model.js";

export const getAllTransactions = async () => {
  return await Transaction.find();
};

export const createTransaction = async (data) => {
  return await Transaction.create(data);
};
