// models/Herb.js
import mongoose from "mongoose";


const HerbSchema = new mongoose.Schema({
  name: { type: String, required: true },
  properties: { type: String, required: true },
  // add more fields if needed
});

// Check if model already exists before creating
const Herb = mongoose.models.Herb || mongoose.model("Herb", HerbSchema);

export default Herb;
