import {createSlice} from "@reduxjs/toolkit"


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
    }
})

export const {loginSuccess,logout} = authSlice.actions

export default authSlice.reducer