import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.status(201).json({ message: "food added", success: true });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "error in addfood controller",
        error: error.message,
      });
  }
};

// all food list

const listFood = async(req,res) => {
    try {
        const foods = await foodModel.find({})
        res.json({success:true, data: foods})
    } catch (error) {
        res.status(500).json({success:false, message:error})
        console.log("error in listfood controller", error)
    }
}


// remove food item
const removeFood =async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, ()=> {})


        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Food removed"})
    } catch (error) {
        res.status(500).json({success: false, message: error})
        console.log("error in remove food controller")
    }
}

export { addFood,listFood,removeFood };
