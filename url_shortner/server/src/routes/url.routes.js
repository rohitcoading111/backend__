import express from "express"

const router = express.Router();

router.post('/',async function(req,res){
    const {url} = req.body
    if(!url){
        return res.status(400).json({
            message:"url is required"
        });
    }
})

export default router;