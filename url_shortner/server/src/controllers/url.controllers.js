import urlmodel from "../models/url.models.js"
import generateCode from "../utils/shortCode.js"


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
   const shortCode = generateCode();
  try {
    await urlmodel.create({
    originalUrl:url,
    shortCode:shortCode
   })

   res.status(200).json({
    message:"URL shortened successfully",
    data:{
        originalUrl:url,
        shortCode:shortCode,
    }
   })
  } catch (error) {
    res.status(500).json({
        message:"some issue to this particular url not saved or fetched successfully",
        error,
    })
  }

}


const urlRedirect = async (req,res)=>{
   const {code} = req.params;
    const urlFind =  await urlmodel.findOne(
        {
            shortCode:code
        }
    );
   if(!urlFind){
    return res.status(400).json({
        message:'url not found'
    })
   }

   res.redirect(302,urlFind.originalUrl);
   
   await urlmodel.findOneAndUpdate({
      shortCode:code
   },{
    $inc :{clicks:1}
   });
}


const urlFind = async (req,res) =>{
   const allUrl = await urlmodel.find();
   res.status(200).json({
    message:"all url fetched successfully",
    data:{
        allUrl,
    }
   })
}

export {
    urlChecker,
    urlRedirect,
    urlFind
}