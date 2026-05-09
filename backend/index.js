
// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
// import connectDb from "./config/db.js"
// import cookieParser from "cookie-parser"
// import authrouter from "./routes/auth.routes.js"
// import cors from "cors"
// import userrouter from "./routes/user.routes.js"
// import shoprouter from "./routes/shop.routes.js"
// import itemrouter from "./routes/item.routes.js"

// const app = express()

// app.use(cors({
//   origin: [
//     "https://vingo-frontend-dun.vercel.app",
//     "http://localhost:5173"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
// }))

// app.use(express.json())
// app.use(cookieParser())
// app.use("/api/auth", authrouter)
// app.use("/api/user", userrouter)
// app.use("/api/shop", shoprouter)
// app.use("/api/item", itemrouter)

// connectDb()

// export default app


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

// ✅ CORS Fix
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "https://vingo-frontend-dun.vercel.app",
      "http://localhost:5173"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}))

// ✅ Yeh line zaroori hai - OPTIONS preflight handle karta hai
app.options('*', cors())

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authrouter)
app.use("/api/user", userrouter)
app.use("/api/shop", shoprouter)
app.use("/api/item", itemrouter)

connectDb()

export default app