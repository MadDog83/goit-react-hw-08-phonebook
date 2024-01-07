
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://connections-api.herokuapp.com';

export const register = createAsyncThunk('auth/register', async (credentials) => {
  const response = await axios.post(`${BASE_URL}/users/signup`, credentials);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${BASE_URL}/users/login`, credentials);
  return response.data;
});

export const updateCurrentUser = createAsyncThunk('auth/updateCurrentUser', async (user) => {
  const response = await axios.patch(`${BASE_URL}/users`, user);
  return response.data;
});

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, { getState }) => {
  const state = getState();
  const token = state.auth.token;

  if (!token) {
    throw new Error('Token is null. User must be logged in to fetch contacts.');
  }

  const response = await axios.get(`${BASE_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact, { getState }) => {
  const state = getState();
  const token = state.auth.token;

  const response = await axios.post(`${BASE_URL}/contacts`, contact, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, { getState }) => {
  const state = getState();
  const token = state.auth.token;

  await axios.delete(`${BASE_URL}/contacts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
});