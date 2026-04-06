import express from "express";
import * as galleryController from "../controllers/galleryController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

// routes
router.get("/", galleryController.getGallery);
router.post("/upload", upload.array("image", 50), galleryController.uploadImage);
router.post("/upload-url", galleryController.uploadImageByUrl);
router.delete("/:id", galleryController.deleteImage);
router.put("/:id", galleryController.updateImage);

export default router;