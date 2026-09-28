import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice.js";
import productReducer from "../features/products/state/productSlice.js"

const store = configureStore({
   reducer :{
     auth:authReducer,
     product:productReducer
   } 
})

export default store 