import * as saleService from "./sale.service.js";

export const getSales = async (req, res, next) => {
  try {
    const sales = await saleService.getAllSales();
    res.status(200).json({ success: true, count: sales.length, data: sales });
  } catch (error) {
    next(error);
  }
};

export const createSale = async (req, res, next) => {
  try {
    const sale = await saleService.createSale(req.body);
    res.status(201).json({ success: true, message: "Sale created", data: sale });
  } catch (error) {
    next(error);
  }
};
