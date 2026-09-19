import { createSlice,createAsyncThunk, } from '@reduxjs/toolkit';
import { shortUrl } from './urlApi';

export const shortenUrl = createAsyncThunk(
   "url/shorten",
   async (longUrl)=>{
    return shortUrl(longUrl)
   }
);
const initialState = {
  initialUrl: "",
  loading: false,
  data: null,
  error: null,
};

const urlSlice = createSlice({
    name:"url",
    reducers:{
      urlValue: (state,action)=>{
      state.value = action.payload
      }
    }
})

extraReducers:(builder)=>{
     builder.addCase(shortenUrl.pending,(state)=>{
      state.loading = true
     }).addCase(shortUrl.fulfilled,(state,action)=>{
      state.data = action.payload
     }).addCase(shortUrl.rejected,(state)=>{
      state.loading = false
      state.error = "url has been rejected"
     })
}


export const {urlValue} = urlSlice.actions;
export default urlSlice.reducer;