import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import orderRoutes from "./routes/order.route.js";
import serviceRoutes from './routes/service.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend.vercel.app"],
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
