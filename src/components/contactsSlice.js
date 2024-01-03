import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://658dd9907c48dce94739c843.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(BASE_URL);
  return response.json();
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  return response.json();
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], filter: '' },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      });
  },
});

export const { actions } = contactsSlice;
export default contactsSlice.reducer;