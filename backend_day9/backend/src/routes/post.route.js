const express = require("express");
const multer = require("multer");

const {
    createPost,
    getPosts,
    updatePost
} = require("../controllers/post.controller");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/", upload.single("image"), createPost);
router.put("/:id", upload.single("image"), updatePost);
router.get("/", getPosts);

module.exports = router;