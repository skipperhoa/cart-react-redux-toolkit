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
        return{
          ...state,
          token: data.token,
          userId: data.user,
          success: success
        }
     },
     updateLoginRTK:(state,action)=>{
      const {success,data} = action.payload
      return{
        ...state,
        token: data.token,
        userId: data.user,
        success: success
      }
   },
  },
})

// Action creators are generated for each case reducer function
export const { login,updateLoginRTK } = loginSlice.actions
export const selectLogin = (state) => state.login;
export default loginSlice.reducer