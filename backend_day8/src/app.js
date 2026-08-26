const express = require("express");
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("backend running successfully");
});

module.exports = app;