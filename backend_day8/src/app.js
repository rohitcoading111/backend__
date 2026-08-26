const express = require("express");
const app = express();
const file = require("./routes/file.route")
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("backend running successfully");
});

app.use("/file",file)

module.exports = app;