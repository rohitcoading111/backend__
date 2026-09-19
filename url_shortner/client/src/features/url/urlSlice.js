import { createSlice,createAsyncThunk, } from '@reduxjs/toolkit';
import { shortUrl, getAllUrls, deleteUrl } from "./urlApi.js";

export const shortenUrl = createAsyncThunk(
   "url/shorten",
   async (longUrl)=>{
    return shortUrl(longUrl)
   }
);

export const allUrls = createAsyncThunk(
  "url/allUrl",
  async ()=>{
    return getAllUrls();
  }
);

export const removeUrl = createAsyncThunk(
  "url/delete",
  async (code) => {
    return deleteUrl(code);
  }
);
const initialState = {
  initialUrl: "",
  loading: false,
  data: null,
  error: null,
  urls:[]
};

const urlSlice = createSlice({
    initialState,
    name:"url",
    reducers:{
      urlValue: (state,action)=>{
      state.initialUrl = action.payload
      },
      increanmentClick: (state,action)=>{ 
       const url = state.urls.find((item)=> item.shortCode === action.payload)
       if(url){
        console.log("FOUND URL:", url);
        url.clicks += 1;
       }
      }
    
    },
    extraReducers:(builder)=>{
     builder.addCase(shortenUrl.pending,(state)=>{
      state.loading = true
     }).addCase(shortenUrl.fulfilled,(state,action)=>{
      state.data = action.payload
     state.urls.unshift({
  ...action.payload.data,
  clicks: action.payload.data.clicks ?? 0
})
      state.loading = false
     }).addCase(shortenUrl.rejected,(state)=>{
      state.loading = false
      state.error = "url has been rejected"
     }).addCase(allUrls.pending,(state)=>{
      state.loading = true
     }).addCase(allUrls.fulfilled,(state,action)=>{
      state.urls = action.payload.data.allUrl
      state.loading = false
     }).addCase(allUrls.rejected,(state)=>{
      state.loading = false
      state.error = "url has been rejected"
     }).addCase(removeUrl.fulfilled, (state, action) => {
     state.urls = state.urls.filter(
     (item) => item.shortCode !== action.payload.data.shortCode
     );
})
}
})




export const { urlValue, increanmentClick } = urlSlice.actions;
export default urlSlice.reducer;