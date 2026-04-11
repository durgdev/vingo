import express from "express"
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";


const userrouter = express.Router();


userrouter.get("/current",isAuth,getCurrentUser);


export default userrouter;