import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

import herbRoutes from "./routes/herbRoutes.js";
app.use("/api", herbRoutes);


// Connect to MongoDB
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

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const herbSchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
});

const kitSchema = new mongoose.Schema({
  name: String,
  herbs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Herb" }],
});

const User = mongoose.model("User", userSchema);
const Herb = mongoose.model("Herb", herbSchema);
const Kit = mongoose.model("Kit", kitSchema);

// --- Authentication route ---
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Incorrect password" });

  res.json({ message: "Login successful" });
});

// --- Herbs CRUD ---
// Get all herbs
app.get("/herbs", async (req, res) => {
  const herbs = await Herb.find();
  res.json(herbs);
});

// Create new herb
app.post("/herbs", async (req, res) => {
  const herb = new Herb(req.body);
  await herb.save();
  res.json(herb);
});

// Update herb by id
app.put("/herbs/:id", async (req, res) => {
  const herb = await Herb.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(herb);
});

// Delete herb by id
app.delete("/herbs/:id", async (req, res) => {
  await Herb.findByIdAndDelete(req.params.id);
  res.json({ message: "Herb deleted" });
});

console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    run();
    console.log("Server started at  http://localhost:5000");
} )
