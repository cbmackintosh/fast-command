import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/App/AppSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
});
