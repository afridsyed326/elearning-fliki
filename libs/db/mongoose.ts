// libs/db/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGO_URL || "mongodb://localhost:27017/elearning";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    // already connected
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      // options if needed
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};
