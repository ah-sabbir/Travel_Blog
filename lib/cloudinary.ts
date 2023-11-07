import cloudinary, { v2 } from "cloudinary";

// Cloudinary config
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  secure: true,
});

export interface IDatabaseImage {
  public_id: string;
  url: string;
}

export const editCloudinaryImage = async (image: string | IDatabaseImage) => {
  if (image && !(image as string).startsWith("https")) {
    if ((image as IDatabaseImage).public_id) {
      await cloudinary.v2.uploader.destroy((image as IDatabaseImage).public_id);
    }

    const newImage = await cloudinary.v2.uploader.upload(image as string, {
      folder: "travel_blog_admin",
    });

    return newImage;
  }

  if ((image && (image as string)).startsWith("https")) {
    return;
  }
};
