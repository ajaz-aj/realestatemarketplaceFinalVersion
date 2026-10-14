import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    monthlyRent: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
    },

    availableFrom: {
      type: Date,
      required: true,
    },

    leaseDuration: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "rented", "inactive"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;