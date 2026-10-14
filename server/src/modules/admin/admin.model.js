import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    permissions: {
      manageUsers: {
        type: Boolean,
        default: true,
      },

      manageProperties: {
        type: Boolean,
        default: true,
      },

      manageRentals: {
        type: Boolean,
        default: true,
      },

      manageAuctions: {
        type: Boolean,
        default: true,
      },

      manageInvestments: {
        type: Boolean,
        default: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;