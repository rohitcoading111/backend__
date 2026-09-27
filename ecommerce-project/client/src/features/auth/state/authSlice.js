import {createSlice} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"

const initialState = {
    user:null,
    accessToken:null,
    isAuthenticated:false,
};

const authSlice  = createSlice({
    name:"auth",
    initialState,

    reducers:{
      loginSuccess: (state,actions) =>{
        state.user = actions.payload.data;
        state.accessToken = actions.payload.accessToken;
        state.isAuthenticated = true
      },
       logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
      updateAccessToken: (state,action)=> {
          state.accessToken = action.payload;
      }
    }
})

export const {loginSuccess,logout,updateAccessToken} = authSlice.actions

export default authSlice.reducer