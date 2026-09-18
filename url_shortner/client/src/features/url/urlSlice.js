import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { shortUrl } from './urlApi';

export const shortenUrl = createAsyncThunk(
   "url/shorten",
   async (longUrl)=>{
    return shortUrl(longUrl)
   }
);
const initialstate = {
     initialUrl : "",
}

const urlSlice = createSlice({
    name:"url",
    reducers:{
      urlValue: (state,action)=>{
      state.value = action.payload
      }
    }
})

export const {urlValue} = urlSlice.actions;
export default urlSlice.reducer;