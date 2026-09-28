import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    products:[],
    loading:false,
    error:null
}

const products = createSlice({
    name:"productsSlice",
    initialState,
    reducers:{
        setProducts: (state,action)=>{
         state.products = action.payload
        }
    }
})


export const { setProducts } = products.actions;
export default products.reducer;