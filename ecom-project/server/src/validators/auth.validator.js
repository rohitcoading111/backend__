import {body, validationResult} from "express-validator"


const registerValidator  = [
    body("email").trim().exists().withMessage("email  is required")
    .isEmail().withMessage("enter valid email address"),
    body("name")
    .exists().withMessage("name is required")
    .isString().withMessage("name must be a string")
    .trim()
    .isLength({min:2,max:50}).withMessage("Name  length between 2 to 50 characters"),
    body("password").exists().withMessage("password is required")
    .isString().withMessage("password must be a  string").trim()
    .isLength({min:6}).withMessage("password atleast 6 character long "),
    (req,res,next)=>{
        const  errors  = validationResult(req)
        if(!errors){
            return res.status(400).json({
                message : "invalid requests",
                errors : errors.array()
            })
        }
        next()
    }

]

export  default registerValidator;