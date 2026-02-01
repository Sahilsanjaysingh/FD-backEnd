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

// ✅ CORS (local + deployed frontend)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fd-front-end.vercel.app"
  ],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// ✅ Health route
app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

// ✅ API routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

// ✅ DB connect
connectDb()

// ✅ Local server (Vercel ignores this)
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`)
})

// ✅ Export for Vercel
export default app
