const multer = require("multer");

const StorageForLocal = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, "/uploads")
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + file.originalname)
    },
});