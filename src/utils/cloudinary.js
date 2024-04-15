import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  //check the existence of file
  if (!localFilePath) return null;

  // upload to cloudinary with provided localFilePath
  try {
    const upload = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
      },
      (err, res) => {
        if (err) console.error("CLOUDINARY UPLOAD FAILED: ", err);
        console.log("File uploaded successfully ", res);
      }
    );
    return upload;
  } catch (error) {
    // Remove/unlink from local path in case of failure
    fs.unlinkSync(localFilePath);
  }
};
