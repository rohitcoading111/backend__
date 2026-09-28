import {createSlice} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"

const initialState = {
    user:null,
    accessToken:null,
    isAuthenticated:false,
    isLoading: true,
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
      },
      setUser: (state, action) => {
    state.user = action.payload;
    state.isAuthenticated = true;
     },
     finishAuthLoading: (state) => {
    state.isLoading = false;
}
    }
})

export const {loginSuccess,logout,updateAccessToken,setUser} = authSlice.actions

export default authSlice.reducer