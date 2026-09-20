import app from "./app/app.js"
import db from "../src/config/db.js"

db();
app.listen(3000,(req,res)=>{
    console.log("server is running");
})