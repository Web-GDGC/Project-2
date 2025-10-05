//this code serve to order placing system

import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    items: {type:Array, required:true},
    address: {type:Object, required:true},
    status: {type:String, default:"Waiting Approval"},
    date: {type:Date, default:Date.now()}
}) 

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;