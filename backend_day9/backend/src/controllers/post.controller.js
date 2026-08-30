const Post = require("../models/post.model");

const createPost = async (req, res) => {
    try {

        const { caption } = req.body;

        const post = await Post.create({
            image: `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`,
            caption
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
};


module.exports = {
    createPost,
    getPosts
};