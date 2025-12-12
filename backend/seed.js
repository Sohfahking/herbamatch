// seed.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

import Herb from "./models/Herb.js";
import User from "./models/User.js";
import Kit from "./models/Kit.js";

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("MongoDB connection error:", err));

async function seed() {
  try {
    await Herb.deleteMany({});
    await User.deleteMany({});
    await Kit.deleteMany({});

    const herbs = await Herb.insertMany([
      { name: "Chamomile", description: "Calming, aids sleep", properties: ["calming", "anti-inflammatory"], price: 5, imageUrl: "/images/chamomile.jpg" },
      { name: "Peppermint", description: "Relieves headaches", properties: ["digestive", "refreshing"], price: 4, imageUrl: "/images/peppermint.jpg" },
      { name: "Lavender", description: "Reduces stress", properties: ["relaxing", "sleep aid"], price: 6, imageUrl: "/images/lavender.jpg" },
      { name: "Echinacea", description: "Immune support", properties: ["immune boost"], price: 7, imageUrl: "/images/echinacea.jpg" },
      { name: "Ginger", description: "Soothes nausea", properties: ["digestive", "anti-inflammatory"], price: 3, imageUrl: "/images/ginger.jpg" },
      { name: "Turmeric", description: "Anti-inflammatory", properties: ["anti-inflammatory", "detox"], price: 8, imageUrl: "/images/turmeric.jpg" },
      { name: "Lemon Balm", description: "Calms nerves", properties: ["calming", "sleep aid"], price: 5, imageUrl: "/images/lemonbalm.jpg" },
      { name: "Rosemary", description: "Improves memory", properties: ["cognitive", "antioxidant"], price: 4, imageUrl: "/images/rosemary.jpg" },
      { name: "Sage", description: "Aids digestion", properties: ["digestive", "antioxidant"], price: 4, imageUrl: "/images/sage.jpg" },
      { name: "Thyme", description: "Respiratory support", properties: ["immune boost", "respiratory"], price: 4, imageUrl: "/images/thyme.jpg" },
      { name: "Holy Basil", description: "Reduces stress", properties: ["adaptogen", "stress relief"], price: 6, imageUrl: "/images/holybasin.jpg" },
      { name: "Valerian", description: "Supports sleep", properties: ["sleep aid", "calming"], price: 5, imageUrl: "/images/valerian.jpg" }
    ]);

    const users = [
      { name: "Alice", email: "alice@example.com", passwordHash: await bcrypt.hash("password123", 10) },
      { name: "Bob", email: "bob@example.com", passwordHash: await bcrypt.hash("password123", 10) },
      { name: "Clara", email: "clara@example.com", passwordHash: await bcrypt.hash("password123", 10) }
    ];
    const createdUsers = await User.insertMany(users);

    const kits = [
      { userId: createdUsers[0]._id, name: "Relaxing Kit", herbs: [herbs[0]._id, herbs[2]._id, herbs[11]._id], totalPrice: 16 },
      { userId: createdUsers[1]._id, name: "Digestive Kit", herbs: [herbs[4]._id, herbs[1]._id, herbs[8]._id], totalPrice: 11 },
      { userId: createdUsers[2]._id, name: "Immune Boost Kit", herbs: [herbs[3]._id, herbs[9]._id, herbs[5]._id], totalPrice: 19 }
    ];
    await Kit.insertMany(kits);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seed();
