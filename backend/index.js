import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authrouter from "./routes/auth.routes.js"
import cors from "cors"
import userrouter from "./routes/user.routes.js"
import shoprouter from "./routes/shop.routes.js"
import itemrouter from "./routes/item.routes.js"

const app = express()

// ✅ Manual CORS - Sabse Pehle
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://vingo-frontend-dun.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Cookie");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(cors({
  origin: "https://vingo-frontend-dun.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authrouter)
app.use("/api/user", userrouter)
app.use("/api/shop", shoprouter)
app.use("/api/item", itemrouter)

connectDb()

export default app