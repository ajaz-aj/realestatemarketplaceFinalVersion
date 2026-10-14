import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

// Fix for Node.js querySrv EBADRESP on macOS networks
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

dotenv.config();

const connectDB = async (retries = 5, delay = 2000) => {
  for (let i = 1; i <= retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Mongo DB connected succesfully");
      return;
    } catch (error) {
      console.error(`Mongo DB connection attempt ${i} failed:`, error.message);
      if (i === retries) {
        console.error("All MongoDB connection attempts failed.");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};



export default connectDB;