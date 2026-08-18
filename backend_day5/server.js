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


//update
app.put("/update:id",(req,res)=>{
   const { id } = req.params;
   const { name } = req.body;

   users = users.map((val)=>{
    val.id === id ? { ...val ,name} : val
   })

   res.send("updated successfully");
})

//delete

app.delete("/delete", ()=>{
    const { id } = req.params;
    user = users.filter((val)=>{
       return val.id !== id 
    }) 

    res.send(user)

})

app.listen(PORT,()=>{
   console.log("running ");
})