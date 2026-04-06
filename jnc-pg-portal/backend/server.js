import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import eventRoutes from "./routes/eventRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import eventGalleryRoutes from "./routes/eventGalleryRoutes.js";


import placementRoutes from "./routes/placementRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import placementAboutRoutes from "./routes/placementAboutRoutes.js";
import placementContactRoutes from "./routes/placementContactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
/* ===== reetha ===== */
import adminRoutes from "./routes/admin.js";
import path from "path";
import { fileURLToPath } from "url";

/* ================= FIX __dirname ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import researchRoutes from "./routes/research.js";
import pgRoutes from "./routes/postgraduate.js";
import applicationRoutes from "./routes/application.js";
import departmentRoute from "./routes/department.js";
import feeRoutes from "./routes/FeeRoutes.js";
dotenv.config();

// ⭐ CONNECT DATABASE
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ CORS
app.use(
  cors({
    origin:[ "http://localhost:5173","https://jnc-pg-portal.vercel.app/",],

    credentials: true,
  })
);

// ⭐ PARSERS
app.use(express.json());
app.use(cookieParser());

// ⭐ STATIC UPLOADS FOLDER
app.use("/uploads", express.static("uploads"));

// ⭐ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);

// ⭐ FIXED — Department route must be "/api/departments"
app.use("/api/departments", departmentRoutes);


// legha

/* ROUTES */
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/event-gallery", eventGalleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/event-gallery", eventGalleryRoutes);



// legha 

app.use("/api/placements", placementRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/placement-about", placementAboutRoutes);
app.use("/api/placement-contact", placementContactRoutes);


app.use("/api/chat", chatRoutes);


// reetha 
app.use("/api", feeRoutes);
app.use("/api/postgraduate", pgRoutes);
app.use("/api/application", applicationRoutes); // ✅ ADD

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/admin", adminRoutes);
app.use("/api/department", departmentRoute);
app.use("/api/research", researchRoutes);

app.use("/uploads", express.static("uploads"));
// ⭐ SERVER START
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


