import express from "express"

import isAuth from "../middlewares/isAuth.js";

import { addItem, deleteItem, editItem, getItemByCity, getItembyId } from "../controllers/item.controllers.js";
import { upload } from "../middlewares/multer.js";


const itemrouter = express.Router();


itemrouter.post("/add-item",isAuth,upload.single("image"),addItem);
itemrouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem);
itemrouter.get("/get-by-id/:itemId",isAuth,getItembyId);
itemrouter.delete("/delete/:itemId",isAuth,deleteItem);

itemrouter.get("/get-by-city/:city",isAuth,getItemByCity);



export default itemrouter;