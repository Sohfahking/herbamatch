import express from 'express';
import mongoose from "mongoose";
import { run } from './config/db.js';
import Product from './models/product.js';

const app = express();
app.use(express.json()); //allows json data in req.body 

app.get("/", (req, res) => {
    res.send("Server is running");
});


//create product 
app.post("/api/products", async (req,res) =>{
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message:"Please provide all required info"});
    }

    const newProduct =  new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    } catch (error) {
        console.error("Error: Could not create product ", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
});

// Read all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


//update product
app.put("/api/products/:id", async (req,res) =>{
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Product not found"});
    }

    try{
        const updated = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updated});

    } catch (error){
        res.status(500).json({success:false, message:"Server Error"});
    }
});


// delete product
app.delete("/api/products/:id", async (req,res) =>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        console.log("id:", id, "deleted successfully");
        res.status(200).json({success:true, message:"Product deleted"})
    } catch (error){
        console.error("Error deleting product: ", error.message);
        res.status(404).json({success:false, message:"Product not found"});
    }

    });

/*console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    run();
    console.log("Server started at  http://localhost:5000");
} )

user: dtorain0, pass: Puppybunny2 */