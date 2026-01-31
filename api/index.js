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

// ================= MIDDLEWARE =================

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"   // change after frontend deploy
  ],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// ================= HEALTH CHECK =================

app.get("/health", (req, res) => {
  res.json({ status: "Backend running fine 🚀" })
})

// ================= ROUTES =================

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

// ================= DATABASE =================

connectDb()

// ================= SOCKET (LOCAL ONLY) =================

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

// ================= LOCAL SERVER =================

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// ================= REQUIRED FOR VERCEL =================

export default app
