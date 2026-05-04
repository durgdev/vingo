import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { createEditShop, getMyshop, getShopByCity } from "../controllers/shop.controllers.js";
import { upload } from "../middlewares/multer.js";




const shoprouter = express.Router();


shoprouter.post("/create-edit",isAuth,upload.single("image"),createEditShop);
shoprouter.get("/get-my",isAuth,getMyshop)
shoprouter.get("/get-by-city/:city",isAuth,getShopByCity)


export default shoprouter;