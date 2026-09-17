import urlmodel from "../models/url.models.js"

const urlChecker = (req,res)=>{
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

}



export default urlChecker