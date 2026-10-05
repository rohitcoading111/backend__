import imagekit from "../config/imagekit.js";
import config from "../config/config.js";

export const getImageKitAuth = (req, res) => {
  try {
    const { type } = req.body;

    let folder;

    if (type === "AVATAR") {
      folder = "/lms/avatars";
    }

    if (type === "COURSE_THUMBNAIL") {
      folder = "/lms/course-thumbnails";
    }

    if (type === "COURSE_VIDEO") {
      folder = "/lms/course-videos";
    }

    const { token, expire, signature } =
      imagekit.helper.getAuthenticationParameters();

    return res.status(200).json({
      success: true,
      data: {
        token,
        expire,
        signature,
        publicKey: config.IMAGEKIT_PUBLIC_KEY,
        folder,
      },
    });
  } catch (error) {
    console.error("ImageKit auth error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate ImageKit authentication parameters",
    });
  }
};