import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { createEditShop, getMyshop } from "../controllers/shop.controllers.js";
import { upload } from "../middlewares/multer.js";




const shoprouter = express.Router();


shoprouter.post("/create-edit",isAuth,upload.single("image"),createEditShop);
shoprouter.get("/get-my",isAuth,getMyshop)


export default shoprouter;