const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000

let users = []

//create 
app.post("/create",(req,res)=>{
    const body = req.body
    users.push(body);
    res.send("user created successfullly")
})

//read
app.get("/read",(req,res)=>{
     res.send(users)
})

app.listen(PORT,()=>{
   console.log("running ");
})