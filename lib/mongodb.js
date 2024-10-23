import mongoose from "mongoose";

// Type-safe function to connect to MongoDB
const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "";
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
