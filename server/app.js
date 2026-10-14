import express from "express";
import cors from "cors";
import propertyRoutes from "./src/modules/property/property.routes.js";
import authRoutes from "./src/modules/auth/auth.routes.js";
import userRoutes from "./src/modules/user/user.routes.js";
import wishlistRoutes from "./src/modules/wishlist/wishlist.routes.js";
import rentalRoutes from "./src/modules/rentals/rentals.routes.js";
import auctionRoutes from "./src/modules/auction/auction.routes.js";
import investmentRoutes from "./src/modules/investment/investment.routes.js";
import adminRoutes from "./src/modules/admin/admin.routes.js";
import featuredCollectionRoutes from "./src/modules/featuredcollection/featuredcollection.routes.js";
import rentPhotoRoutes from "./src/modules/rentphoto/rentphoto.routes.js";
import collectionRoutes from "./src/modules/collection/collection.routes.js";
import agentRoutes from "./src/modules/agent/agent.routes.js";
import leadRoutes from "./src/modules/leads/lead.routes.js";
import scheduleRoutes from "./src/modules/schedules/schedule.routes.js";
import analyticsRoutes from "./src/modules/analytics/analytics.routes.js";
import saleRoutes from "./src/modules/sales/sale.routes.js";
import transactionRoutes from "./src/modules/transactions/transaction.routes.js";
import contentRoutes from "./src/modules/content/content.routes.js";
import chatRoutes from "./src/modules/chat/chat.routes.js";
import { errorHandler } from "./src/middlewares/error.midlleware.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      // allow localhost origins on any port for development
      if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/featured-collections", featuredCollectionRoutes);
app.use("/api/rentphoto", rentPhotoRoutes);
app.use("/api/rent-photos", rentPhotoRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.use(errorHandler);

export default app;