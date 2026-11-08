import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});


export const uploadVideo = multer({
  storage: multer.memoryStorage(),

  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("video/")) {
      return callback(new Error("Only video files are allowed"));
    }

    callback(null, true);
  },
});

const bankProofUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Bank proof must be a PDF, JPG, or PNG file."));
    }

    callback(null, true);
  },
});

export const uploadBankProof = (req, res, next) => {
  bankProofUpload.single("bankProofFile")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Unable to upload bank proof.",
      });
    }

    next();
  });
};

export default upload;