import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import entryRoutes from "./routes/entries.js";
import uploadRoutes from "./routes/upload.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// Railway provides PORT environment variable
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/entries", entryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);

// Health Check (Railway uses this if you set healthcheckPath)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Callie Love Calendar API" });
});

// ---- 🔥 PRODUCTION FRONTEND SERVING (REQUIRED FOR RAILWAY) ---- //

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve built frontend files from frontend/dist
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));

// Fallback: any route not starting with /api should load React app
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// ---- END PRODUCTION SECTION ---- //

// Connect to MongoDB & start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

export default app;
