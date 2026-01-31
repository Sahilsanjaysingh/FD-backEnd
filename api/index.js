import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDb from "../config/db.js"

import authRouter from "../routes/auth.routes.js"
import userRouter from "../routes/user.routes.js"
import itemRouter from "../routes/item.routes.js"
import shopRouter from "../routes/shop.routes.js"
import orderRouter from "../routes/order.routes.js"

dotenv.config()
const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://fd-front-end.vercel.app"
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))

app.options("*", cors())

app.use(express.json())
app.use(cookieParser())

app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

connectDb()

export default app
