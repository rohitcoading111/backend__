import app from "../src/app/app.js"
import db from "../src/config/db.js"
db();
app.listen(3000,()=>{
    console.log("server is running");

})