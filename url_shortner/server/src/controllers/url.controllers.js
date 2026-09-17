import urlmodel from "../models/url.models.js"
import shortCode from "../utils/shortCode.js"

const urlChecker =async (req,res)=>{
    const {url} = req.body
    if(!url){
        return res.status(400).json({
            message:"url is required"
        })
    }
    if(url.startsWith("http://")==false && url.startsWith("https://")==false){
    return res.status(400).json({
        error: "url is invalid"
    })
   }

   if(url.length>2048){
    return res.status(400).json({
        error:"url is too long"
    })
   }

   await urlmodel.create({
    originalUrl:url,
    shortCode:shortCode
   })

}



export default urlChecker