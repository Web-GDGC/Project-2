import bookModel from "../models/bookModel.js";
import fs from "fs";


//add book item

const addbook = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const book = new bookModel({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category,
        image: image_filename,
    })
    try{
        await book.save()
        res.json({success:true, message:"Book Added successfully"})
    }catch(err){
        console.log(err)
        res.json({success:false, message:"Error"})
    }

}

//get all book items in the database

const listbook = async (req, res) => {
    try {
        let datas = await bookModel.find({})
        res.json({ success: true, data: datas })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//delete book item
const removeBook = async (req, res) => {
    try {
        let book = await bookModel.findById(req.body.id);
        fs.unlink(`uploads/${book.image}`, ()=>{})

        await bookModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Book deleted unsuccessfully" });
    }
}

export {addbook, listbook, removeBook}