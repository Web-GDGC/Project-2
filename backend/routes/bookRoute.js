import express from 'express';
import { addbook, listbook, removeBook } from '../controllers/bookControllers.js';
import multer from 'multer';


const bookRouter = express.Router();

//Image store engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage});
//----------------------------------------------------------------

//add the image store to the api
bookRouter.post("/add", upload.single("image") ,addbook)
bookRouter.get("/list", listbook)
bookRouter.post("/remove", removeBook) 



export default bookRouter;