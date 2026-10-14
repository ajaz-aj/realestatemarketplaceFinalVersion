import * as transactionService from "./transaction.service.js";

export const getTransactions = async (req, res, next) => {
  try {
    const data = await transactionService.getAllTransactions();
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const created = await transactionService.createTransaction(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};
