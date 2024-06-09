import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import userModel from "../models/userModel.js";

const stripe = new Stripe(
  "sk_test_51POXPmP3iu77TZdrt911AWnUJXh2GmxtZrAuHJVzKkgXxUwkzAefgKZmpZljZizeDkIgVE7oqX1DnCwBU7B0TVHp001a8OaHif"
);
console.log("stripe key", stripe);

// placing user order for frontend

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:3000";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: "pending", // Add the status field here
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // payment integration
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 ,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 49 * 100 ,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in orderController" });
  }
};
const verfyOrder = async(req,res) => {
    const{orderId, success} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment: true})
            res.json({success:true, message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message: "Not Paid"})
        }
    } catch (error) {
        console.log("error",error)
        res.json({success:false, message: "error in veryfy controller"})
    }
}

// user orders for frontend
const userOrder = async(req,res) => {
  try {
    const orders = await orderModel.find({userId: req.body.userId})
    res.json({success:true, data: orders})
  } catch (error) {
    console.log(error)
    res.json({success: false, message: "error in user order controller"})
  }
}


// get all orders of all users for admin page
const listOrders = async(req,res) => {
  try {
    const orders = await orderModel.find({})
    res.json({success:true, data: orders})
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "error"})
  }
}

// api for updating status
const updateStatus =async(req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
    res.json({succes:true, message: "status updated"})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"error in updating status controller"})
  }
}
 
export { placeOrder ,verfyOrder,userOrder,listOrders,updateStatus};
