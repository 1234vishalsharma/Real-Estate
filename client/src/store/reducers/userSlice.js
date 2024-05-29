import { createSlice } from '@reduxjs/toolkit'

export const useSlice = createSlice({
  name: 'userslice',
  initialState: {
    loading: false,
    currentUser: null,
    error: null
  },
  reducers: {
    signInStart: (state) =>{
        state.loading = true
    },
    signInSuccess: (state,action) =>{
        state.currentUser = action.payload;
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