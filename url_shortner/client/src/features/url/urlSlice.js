import { createSlice,createAsyncThunk, } from '@reduxjs/toolkit';
import { shortUrl, getAllUrls } from './urlApi';

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
      }
    },
    extraReducers:(builder)=>{
     builder.addCase(shortenUrl.pending,(state)=>{
      state.loading = true
     }).addCase(shortenUrl.fulfilled,(state,action)=>{
      state.data = action.payload
      state.urls.unshift(action.payload.data)
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
     })
}
})




export const {urlValue} = urlSlice.actions;
export default urlSlice.reducer;