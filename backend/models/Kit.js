import mongoose from "mongoose";

const kitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  herbs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Herb" }],
  totalPrice: Number
});

const Kit = mongoose.model("Kit", kitSchema);

export default Kit; 

