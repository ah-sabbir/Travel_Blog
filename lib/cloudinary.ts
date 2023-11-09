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

export const editCloudinaryImage = async (
  newImageUrl: string | IDatabaseImage,
  oldImage?: IDatabaseImage
) => {
  if (newImageUrl && !(newImageUrl as string).startsWith("https")) {
    if (oldImage?.public_id) {
      await cloudinary.v2.uploader.destroy(oldImage?.public_id);
    }

    const newImage = await cloudinary.v2.uploader.upload(
      newImageUrl as string,
      {
        folder: "travel_blog_admin",
      }
    );

    return newImage;
  }

  if ((newImageUrl && (newImageUrl as string)).startsWith("https")) {
    return;
  }
};
