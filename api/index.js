import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDb from "../config/db.js"

import authRouter from "../routes/auth.routes.js"
import userRouter from "../routes/user.routes.js"
import itemRouter from "../routes/item.routes.js"
import shopRouter from "../routes/shop.routes.js"
import orderRouter from "../routes/order.routes.js"

const app = express()

// CORS (frontend + production ready)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fd-front-end.vercel.app"
  ],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// health test
app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

// routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

// DB connect
connectDb()

// local server (for dev only)
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`)
})

export default app
