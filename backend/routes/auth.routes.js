import express from "express"
// import { signIn, signOut, signUp } from "../controllers/auth.controllers.js"
// const authrouter=express.Router()

// authrouter.post("/signup",signUp)
// authrouter.post("/signin",signIn)
// authrouter.get("/signout",signOut)

// export default authrouter
import {
    signIn,
    signOut,
    signUp,
    sendOtp,
    verifyOtp,
    resetPassword
} from "../controllers/auth.controllers.js";

const authrouter = express.Router();

authrouter.post("/signup", signUp);
authrouter.post("/signin", signIn);
authrouter.get("/signout", signOut);

// ✅ ADD THESE
authrouter.post("/send-otp", sendOtp);
authrouter.post("/verify-otp", verifyOtp);
authrouter.post("/reset-password", resetPassword);

export default authrouter;