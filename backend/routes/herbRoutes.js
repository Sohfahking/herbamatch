import express from "express";
import Herb from "../models/Herb.js";

const router = express.Router();

router.get("/herbs", async (req, res) => {
  try {
    const herbs = await Herb.find();
    res.json(herbs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching herbs" });
  }
});

export default router;

