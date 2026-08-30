require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/db/db");
const postRoutes = require("./src/routes/post.route");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});