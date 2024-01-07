import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import authReducer from './authSlice'; 

export default configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
  },
});