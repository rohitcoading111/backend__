import express from "express"
import urlRoutes from "../routes/url.routes.js"
import { Url } from "../models/url.model.js";
const app = express();
app.use(express.json());

app.use("/api/url",urlRoutes)

app.get("/:code",async function(req,res){
    const {code}  = req.params

    const url = await Url.findOne({
        shortCode: code
    })

    if(!url){
        return res.status(404).json({
         error:"url not found"
        }
      )
    }

    res.redirect(302, url.originalUrl)
})
export default app;