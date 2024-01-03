import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

export default configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});