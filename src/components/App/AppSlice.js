import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  checkLoginStatus,
  loginUser,
  logoutUser,
  signupUser
} from '../../apicalls'

const initialState = {
  status: 'idle',
  isLoggedIn: false,
  user: {},
  errors: ''
}

export const loginStatusThunk = createAsyncThunk(
  'loginStatus/loginStatus',
  async () => {
    console.log('test')
    const response = await checkLoginStatus()
    return response
  }
)

export const loginUserThunk = createAsyncThunk(
  'userLogin/userLogin',
  async (user) => {
    const response = await loginUser(user)
    return response
  }
)

export const logoutUserThunk = createAsyncThunk(
  'userLogout/userLogout',
  async () => {
    console.log('test')
    const response = await logoutUser()
    return response
  }
)

export const signupUserThunk = createAsyncThunk(
  'userSignup/userSignup',
  async (user) => {
    const response = await signupUser(user)
    return response
  }
)

export const slice = createSlice({
  name: 'app',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginStatusThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginStatusThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.isLoggedIn = action.payload.logged_in
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.logged_in) {
          state.user = action.payload.user
          state.isLoggedIn = true
        } else {
          state.errors = action.payload.errors
        }
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.isLoggedIn = false
        state.user = {}
      })
      .addCase(signupUserThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.satus = 'idle'
        if (action.payload.status === 'created') {
          state.isLoggedIn = true
          state.user = action.payload.user
        } else {    
          state.errors = action.payload.errors
        }
      })
  }
})

export default slice.reducer