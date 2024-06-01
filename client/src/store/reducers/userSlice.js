import { createSlice } from '@reduxjs/toolkit'

export const useSlice = createSlice({
  name: 'userslice',
  initialState: {
    loading: false,
    currentUser:  localStorage.getItem('token') ? localStorage.getItem('token') : null,
    error: null
  },
  reducers: {
    signInStart: (state) =>{
        state.loading = true
    },
    signInSuccess: (state,action) =>{
      console.log("action payload: ", action.payload);
        state.currentUser = action.payload;
        console.log("current User token is : " , state.currentUser);
        state.loading = false;
        state.error = null;
    },
    signInFailure: (state,action) =>{
        state.loading = false;
        state.error = action.payload;
    },
  }
})


export const { signInStart, signInSuccess , signInFailure } = useSlice.actions

export default useSlice.reducer