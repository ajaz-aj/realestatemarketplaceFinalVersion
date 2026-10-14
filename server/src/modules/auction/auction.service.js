import Auction from "./auction.model.js";
import Property from "../property/property.model.js";

export const createAuction = async (userId, auctionData) => {
  const property = await Property.findById(auctionData.property);

  if (!property) {
    throw new Error("Property not found");
  }

  const existingAuction = await Auction.findOne({
    property: auctionData.property,
    status: {
      $in: ["upcoming", "active"],
    },
  });

  if (existingAuction) {
    throw new Error("This property already has an active auction");
  }

  const auction = await Auction.create({
    ...auctionData,
    seller: userId,
    currentPrice: auctionData.startingPrice,
  });

  return auction;
};

export const getAllAuctions = async () => {
  const auctions = await Auction.find()
    .populate("property")
    .populate("seller", "fullName email")
    .populate("winner", "fullName email");

  return auctions;
};

export const getAuctionById = async (auctionId) => {
  const auction = await Auction.findById(auctionId)
    .populate("property")
    .populate("seller", "fullName email")
    .populate("winner", "fullName email");

  return auction;
};

export const updateAuction = async (
  auctionId,
  userId,
  updateData
) => {
  const auction = await Auction.findOne({
    _id: auctionId,
    seller: userId,
  });

  if (!auction) {
    throw new Error(
      "Auction not found or you are not the seller"
    );
  }

  if (auction.status === "active") {
    throw new Error("Active auction cannot be edited");
  }

  Object.assign(auction, updateData);

  await auction.save();

  return auction;
};

export const deleteAuction = async (
  auctionId,
  userId
) => {
  const auction = await Auction.findOneAndDelete({
    _id: auctionId,
    seller: userId,
  });

  return auction;
};