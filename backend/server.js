import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import herbRoutes from "./routes/herbRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", herbRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

// Connect to MongoDB

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
app.get('/api/herbs', async (req, res) => {
  try {
    const herbs = await Herb.find({});
    res.json(herbs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch herbs' });
  }
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
