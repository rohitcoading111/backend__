import axiosInstance from "../../../config/axiosInstance";



const products = async ()=>{
   const getAllProducts = await axiosInstance.get(
    "/allproducts"
   )

   return getAllProducts.data
}

export default products