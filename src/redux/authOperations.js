import axios from 'axios';
import { actions } from './authSlice';

const BASE_URL = 'https://connections-api.herokuapp.com';

const register = (credentials) => async (dispatch) => {
  dispatch(actions.registerRequest());

  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    dispatch(actions.registerSuccess(response.data));
    localStorage.setItem('token', response.data.token); // Save token to localStorage
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    dispatch(actions.registerError(errorMessage));
    throw error;
  }
};

const login = (credentials) => async (dispatch) => {
  dispatch(actions.loginRequest());

  if (!credentials.email || !credentials.password) {
    dispatch(actions.loginError('Missing email or password'));
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);

    dispatch(actions.loginSuccess(response.data));
    localStorage.setItem('token', response.data.token); // Save token to localStorage
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(actions.loginError(errorMessage));
    throw error;
  }
};

const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove token from localStorage
  dispatch(actions.logout());
};

export { register, login, logout };