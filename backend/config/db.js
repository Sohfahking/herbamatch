import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

export async function run() {
  try {
    await mongoose.connect(uri, {
      dbName: "products"
    });

    console.log("Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("Error: connection failed", error.message);
    process.exit(1);
  }
}


