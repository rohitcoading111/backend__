const express = require("express");
const multer = require("multer");

const {
    createPost,
    getPosts
} = require("../controllers/post.controller");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/", upload.single("image"), createPost);

router.get("/", getPosts);

module.exports = router;