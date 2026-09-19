const generateCode = ()=>{
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
  let shortCode = ""
  for(let i = 0; i<6; i++){
      shortCode += characters.charAt(Math.floor(Math.random()*characters.length))
  }
  
  return shortCode;
  
}
export default generateCode;