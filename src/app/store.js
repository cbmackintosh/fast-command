import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/App/AppSlice'
import incidentReducer from '../components/Dashboard/DashboardSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    incidents: incidentReducer
  },
});
