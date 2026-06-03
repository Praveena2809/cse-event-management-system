import multer from "multer";
import path from "path";
import fs from "fs";
import { initCloudinary } from "../config/cloudinary.js";

const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadToCloudinaryIfConfigured = async (localFilePath, folder = "cse-events") => {
  const cloudinary = initCloudinary();
  if (!cloudinary) return { url: null, provider: "local" };

  const result = await cloudinary.uploader.upload(localFilePath, {
    folder,
    resource_type: "image",
  });
  return { url: result.secure_url, provider: "cloudinary" };
};

