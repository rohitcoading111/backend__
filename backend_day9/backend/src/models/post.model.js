const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;