import { log } from "console"
import crypto from "crypto"

const generateCode = ()=>{
     const mainSting = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
     let shortCode = ""
     for(let i = 0; i< 6; i++){
        shortCode += mainSting.charAt(Math.floor(Math.random() * 62))
     }

    
}

generateCode();