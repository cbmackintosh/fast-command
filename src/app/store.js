import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/app/AppSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
});
