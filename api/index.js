import express from "express"
import dotenv from "dotenv"
dotenv.config()

import connectDb from "../config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import authRouter from "../routes/auth.routes.js"
import userRouter from "../routes/user.routes.js"
import itemRouter from "../routes/item.routes.js"
import shopRouter from "../routes/shop.routes.js"
import orderRouter from "../routes/order.routes.js"

import { socketHandler } from "../socket.js"

const app = express()

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",     // local dev
    "https://your-frontend.vercel.app"  // production frontend
  ],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

// DB connect (important to call once)
connectDb()

// ---- SOCKET SETUP (works locally, limited on Vercel) ----
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app"
    ],
    credentials: true
  }
})

app.set("io", io)
socketHandler(io)

// ---- LOCAL ONLY SERVER ----
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000
  server.listen(port, () => {
    console.log(`Server running on ${port}`)
  })
}

// ---- REQUIRED FOR VERCEL ----
export default app
