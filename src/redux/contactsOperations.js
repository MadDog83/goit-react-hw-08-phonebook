import { createAsyncThunk } from '@reduxjs/toolkit';

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