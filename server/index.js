// index.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import notesRoutes from "./src/routes/notes.routes.js";

dotenv.config();
const app = express();

// Middlewares must be at the top to process incoming requests
app.use(cors());
app.use(express.json());

// Add this simple route to handle the root URL
app.get("/", (req, res) => {
  res.send("API is running successfully! Go to /api/auth or /api/notes");
});

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));