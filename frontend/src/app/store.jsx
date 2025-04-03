import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profil/profilSlice';
import userReducer from '../features/UpdateUserName/UpdateUserNameSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    user: userReducer,
  },
});
