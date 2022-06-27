import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token:"",
  userId:0,
  success:false,
  data:{}
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
     login:(state,action)=>{
        const {success,data} = action.payload
        state.token = data.token
        state.userId = data.user
        state.success = success
     },
  },
})

// Action creators are generated for each case reducer function
export const { login } = loginSlice.actions
export const selectLogin = (state) => state.login;
export default loginSlice.reducer