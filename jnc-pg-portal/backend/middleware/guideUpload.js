import multer from "multer";
import path from "path";

/* ================= STORAGE ================= */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/guides");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/* ================= UPLOAD ================= */
const upload = multer({ storage });

export default upload;