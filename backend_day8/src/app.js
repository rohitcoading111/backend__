const { configDotenv } = require("dotenv")
const express = require("express")
require(configDotenv)


const app = express()
app.use(express.json())

app.get("/", (req,res) =>{
    res.send("all are done")
});

module.exports = app