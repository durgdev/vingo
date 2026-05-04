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
// const app=express()
// const port=process.env.PORT||5000
// app.use(cors({
//     origin: "https://vingo-frontend-dun.vercel.app",
//     credentials: true
// }))
// app.use(express.json())
// app.use(cookieParser())
// app.use("/api/auth",authrouter)
// app.use("/api/user",userrouter)
// app.use("/api/shop",shoprouter)
// app.use("/api/item",itemrouter)
// app.listen(port,()=>{

//     connectDb()
   
//     console.log(`server start at ${port}`);
    
// })


// export default app  

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
// const port = process.env.PORT || 5000

// app.options("*", cors())
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

// app.listen(port, () => {
//   connectDb()
//   console.log(`server start at ${port}`)
// })

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
const port = process.env.PORT || 5000

app.use(cors({
  origin: [
    "https://vingo-frontend-dun.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authrouter)
app.use("/api/user", userrouter)
app.use("/api/shop", shoprouter)
app.use("/api/item", itemrouter)

app.listen(port, () => {
  connectDb()
  console.log(`server start at ${port}`)
})

export default app
