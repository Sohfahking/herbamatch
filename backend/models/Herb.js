// models/Herb.js
import mongoose from "mongoose";

const herbSchema = new mongoose.Schema({
  name: String,
  description: String,
  properties: [String],
  price: Number,
  imageUrl: String
});

const Herb = mongoose.model("Herb", herbSchema);

export default Herb;