import {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
} from "./auction.service.js";

export const createAuctionController = async (req, res) => {
  try {
    const auction = await createAuction(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Auction created successfully",
      data: auction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAuctions = async (req, res) => {
  try {
    const auctions = await getAllAuctions();

    res.status(200).json({
      success: true,
      data: auctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAuction = async (req, res) => {
  try {
    const auction = await getAuctionById(
      req.params.auctionId
    );

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAuctionController = async (req, res) => {
  try {
    const auction = await updateAuction(
      req.params.auctionId,
      req.user.id,
      req.body
    );

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Auction updated successfully",
      data: auction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAuctionController = async (req, res) => {
  try {
    const auction = await deleteAuction(
      req.params.auctionId,
      req.user.id
    );

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Auction deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};