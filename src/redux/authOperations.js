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
    return response.data; // Add this line
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    dispatch(actions.registerError(errorMessage));
    throw error; // And this line
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
    return response.data; // Add this line
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(actions.loginError(errorMessage));
    throw error; // And this line
  }
};

export { register, login };