const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello Backend");
});

app.get("/about",(req,res)=>{
     res.send("welcome to about page")
})

app.get("/practice",(req,res)=>{
    res.send("i am practicing backend")
})

app.get("/collage",(req,res)=>{
    res.send("Uou bca studene")
})

app.get("/skills",(req,res)=>{
    res.send("i have skilled frontend developer")
})

app.get("/test", (req, res) => {
    console.log("URL:", req.url);
    console.log("Method:", req.method);
       console.log(req.headers);

    res.send("Check your terminal");
});


app.listen( process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});