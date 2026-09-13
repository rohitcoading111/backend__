import express from "express"
import generateCode from "../utils/generateCode.js"
import { Url } from "../models/url.model.js";

const router = express.Router();
router.post("/",async function(req,res){
   const {url} = req.body;
   if(!url){
    return res.status(400).json({
        error:"url is requireed"
    })
   }

   if(url.startsWith("http://")==false && url.startsWith("https://")==false){
    return res.status(400).json({
        error: "url is invalid"
    })
   }

   if(url.length>2048){
    return resizeBy.status(400).json({
        error:"url is too long"
    })
   }

   const code  = generateCode();
   const newUrl = await Url.create({
    originalUrl:url,
    shortCode:code,
   });
   return res.status(201).json({
     message:"url shorten successfully",
     data:{
        originalUrl:newUrl.originalUrl,
        shortCode:newUrl.shortCode
     }
   })
})

router.get("/",async function(req,res){
    const urls = await Url.find()
    return res.status(201).json({
        message:"urls fetched successfully",
        data:{
            urls
        }
    })
})




export default router;
