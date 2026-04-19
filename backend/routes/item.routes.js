import express from "express"

import isAuth from "../middlewares/isAuth.js";

import { addItem, editItem, getItembyId } from "../controllers/item.controllers.js";
import { upload } from "../middlewares/multer.js";


const itemrouter = express.Router();


itemrouter.post("/add-item",isAuth,upload.single("image"),addItem);
itemrouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem);
itemrouter.get("/get-by-id/:itemId",isAuth,getItembyId);

export default itemrouter;