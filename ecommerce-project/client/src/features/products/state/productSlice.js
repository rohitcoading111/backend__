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
        },
        removeProduct: (state, action) => {
        state.products = state.products.filter(
        (product) => product._id !== action.payload
    )
}
    }
})


export const { setProducts,removeProduct } = products.actions;
export default products.reducer;