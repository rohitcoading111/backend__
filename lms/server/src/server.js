import app from './app/app.js'
import db from "./config/db.js"

db();
app.listen(3000,()=>{
    console.log("server is running");

})