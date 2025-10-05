import orderModel from "../models/orderModel.js";
import bookModel from "../models/bookModel.js"
import Stripe from "stripe";
    

// placing the user order on the frontend page
const placeOrder = async (req, res) => {
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const frontend_url = 'http://localhost:5173/'

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            address: req.body.address
        })
        await newOrder.save(); // saving in the database 
        
    
        res.json({success:true, message:"Your Request send for the Approval."})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in Sending Request"})
    }
};


//Creating a tempararily verifying payment system (devops is a proper way to verify the order)
const verifyOrder = async (req, res) =>{
    const {orderId, success} = req.body
    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            res.json({success:true, message:'payment done successfully'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:'payment not done'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in verifying order"})
    }
}

//fetching all orders of a user
const userOrders = async (req, res) => {
    try {
        const userOrders = await orderModel.find({userId: `${req.body.userId}`})
        res.json({success: true, data: userOrders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in fetching orders"})
    }
}

// fetchin all the orders in the database
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error in fetching orders" })
    }
}

const updateStatus = async (req, res) => {
    try {
        const data = await orderModel.findById(req.body.id)
        console.log(data.status)
        if(data.status === "Verifying" && req.body.status === "Waiting Approval"){
            res.json({ success: false, message: 'You have put request is verification.' })
        }
        if(data.status === "Waiting Approval" && req.body.status === "Verifying"){
            await orderModel.findByIdAndUpdate(req.body.id, { status:req.body.status})
            return res.json({ success: true, message: 'Request is put Under the varification.' })
        }
        if(data.status === "Accepted" && (req.body.status === "Waiting Approval" || req.body.status === "Verifying")){
            return res.json({ success: false, message: 'You have Already Accepted the Request.' })
        }
        if (data.status === req.body.status){
            return res.json({ success: false, message: 'You have Already Updated the Status.' })
        }
        if(data.status === "Returned" && (req.body.status === "Waiting Approval" || req.body.status === "Verifying" || req.body.status === "Accepted")){
            return res.json({ success: false, message: 'Book is Already Returned.' })
        }
        if(req.body.status === "Accepted"){
            const a = await orderModel.findById(req.body.id);
            for (const item of a.items){
                const c = await bookModel.findById(item._id)
                await bookModel.findByIdAndUpdate(item._id, {quantity: c.quantity-1})
            }
            await orderModel.findByIdAndUpdate(req.body.id, { status:req.body.status})
            return res.json({ success: true, message: 'Accepted successfully' })
        }
        if(req.body.status === "Returned" && data.status !="Accepted"){
            return res.json({ success: true, message: "You haven't Accepted the Request yet!" })
        }
        if(req.body.status === "Returned"){
            const a = await orderModel.findById(req.body.id);
            for (const item of a.items){
                const c = await bookModel.findById(item._id)
                await bookModel.findByIdAndUpdate(item._id, {quantity: c.quantity+1})
            }
            await orderModel.findByIdAndUpdate(req.body.id, { status:req.body.status})
            return res.json({ success: true, message: 'Returned successfully'})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error in updating status' })
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}