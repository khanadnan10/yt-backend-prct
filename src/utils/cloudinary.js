import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "adnanprct",
  api_key: "744337765221512",
  api_secret: "ZrUjOgePmyhjx0mJkJcJmhUKbUo",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
