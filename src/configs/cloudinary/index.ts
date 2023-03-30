import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryOption = {
  cloudinary,
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
  params: {
    folder: "nodejs",
    allowed_formats: ["jpg", "png", "mp4"],
    resource_type: "auto",
  },
};

const storage = new CloudinaryStorage(cloudinaryOption);

const uploadCloud = multer({ storage });

export default uploadCloud;
