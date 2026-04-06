import GalleryImage from "../models/GalleryImage.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET
export const getGallery = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPLOAD FILE
export const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const fileUrl = `/uploads/${file.filename}`;

      const img = new GalleryImage({
        filename: file.originalname,
        path: fileUrl,
        caption: req.body.caption || "",
        company: req.body.company || "",
        year: req.body.year || "",
        uploadedBy: req.user?.role || "admin",
      });

      await img.save();
      uploadedImages.push(img);
    }

    res.status(201).json(uploadedImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPLOAD BY URL
export const uploadImageByUrl = async (req, res) => {
  try {
    const { urls, company, year, caption } = req.body;

    if (!urls || typeof urls !== "string") {
      return res.status(400).json({ error: "URLs must be comma-separated string" });
    }

    const urlList = urls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (urlList.length === 0) {
      return res.status(400).json({ error: "No valid URLs provided" });
    }

    const uploadedImages = [];
    const errors = [];

    for (const imageUrl of urlList) {
      try {
        // ✅ Validate URL
        if (!/^https?:\/\/.+/.test(imageUrl)) {
          errors.push({ url: imageUrl, error: "Invalid URL format" });
          continue;
        }

        // ✅ Safe filename extraction
        let filename = imageUrl.split("/").pop();

        if (!filename || filename.length < 3) {
          filename = `image-${Date.now()}.jpg`;
        }

        const img = new GalleryImage({
          filename,
          path: imageUrl,
          caption: caption || "",
          company: company || "",
          year: year || "",
          uploadedBy: req.user?.role || "admin",
        });

        await img.save();
        uploadedImages.push(img);

      } catch (err) {
        errors.push({ url: imageUrl, error: err.message });
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(500).json({
        error: "Failed to upload images",
        details: errors,
      });
    }

    res.status(201).json({
      uploadedCount: uploadedImages.length,
      failedCount: errors.length,
      images: uploadedImages,
      errors: errors.length ? errors : undefined,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteImage = async (req, res) => {
  try {
    const img = await GalleryImage.findById(req.params.id);
    if (!img) return res.status(404).json({ error: "Not found" });

    const filePath = path.join(__dirname, "..", img.path.replace("/", ""));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await img.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateImage = async (req, res) => {
  try {
    const updated = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};