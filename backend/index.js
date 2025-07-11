// Packages
import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"

import path from "path"

// Utilities
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()

// App Config
let app = express()
let port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/uploads", uploadRoutes)

const __dirname = path.resolve()
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


connectDB()

app.listen(port, () => {
    console.log(`Listening on port http:localhost:5000`)
})
