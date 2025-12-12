import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Herb" }],
  kits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kit" }]
});


const User = mongoose.models.ModelName ||mongoose.model("User", userSchema);


export default User; 
