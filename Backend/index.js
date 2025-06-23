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
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port: ${port}`);
});
