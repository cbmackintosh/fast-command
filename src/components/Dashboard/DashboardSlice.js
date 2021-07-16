import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getUserIncidents
} from '../../api-calls'

const initialState = {
  status: 'idle',
  incidents: [],
  errors: ''
}

export const getUserIncidentsThunk = createAsyncThunk(
  'userIncidents/userIncidents',
  async (userID) => {
    const response = await getUserIncidents(userID)
    return response
  }
)

export const slice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserIncidentsThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserIncidentsThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.incidents = action.payload.incidents
      })
  }
})

export default slice.reducer