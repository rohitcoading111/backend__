const express = require("express");

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});