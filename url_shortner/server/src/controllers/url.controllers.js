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
   try {
    new URL(url);
   } catch (error) {
    return res.status(400).json({
        message: "url is not valid, please enter a valid URL"
    });
   }

   const existingUrl =  await urlmodel.findOne({
    originalUrl: url
   })

   if(existingUrl){
    return res.status(200).json({
        message:"url already creeated",
        data: {
        shortCode: existingUrl.shortCode,
        clicks: existingUrl.clicks,
        shortUrl : "http://localhost:3000" + "/" + existingUrl.shortCode
      }
    })
   }

   const shortCode = generateCode();
   const shortUrl ="http://localhost:3000" + "/" + shortCode
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
        shortUrl,
    }
   })
  } catch (error) {
    if(error.code === 11000){
       return res.status(500).json({
        message:"url has been already created ",
        error,
    })
    }
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
   try {
    const allUrl = await urlmodel.find();
    res.status(200).json({
    message:"all url fetched successfully",
    data:{
        allUrl,
    }
   })
   } catch (error) {
     res.status(500).json({
        message:"internal server error" , error
     })
   }
}

const urlDelete = async (req, res) => {
  try {
    const { code } = req.params;

    const deletedUrl = await urlmodel.findOneAndDelete({
      shortCode: code
    });

    if (!deletedUrl) {
      return res.status(404).json({
        message: "URL not found"
      });
    }

    res.status(200).json({
      message: "URL deleted successfully",
      data: deletedUrl
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

export {
    urlChecker,
    urlRedirect,
    urlFind,
    urlDelete
}