import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_KEY,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2000000000 }, // 2GB limit
});

export const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    // ✅ If no image is attached, move to the next middleware without sending a response
    if (!req.file) {
      req.cloudinaryImageUrl = null; // Set a default value
      return next();
    }

    // ✅ Upload to Cloudinary
    try {
      const stream = await cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({ message: "Cloudinary upload failed", error: error.message });
          }

          req.cloudinaryImageUrl = result.secure_url;
          next(); // Move to the next middleware
        }
      );

      stream.end(req.file.buffer); // Upload buffer from memory
    } catch (error) {
      console.log("Upload Error:", error);
      return res.status(500).json({ message: "Unexpected error", error: error.message });
    }
  });
};
