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

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    dispatch(actions.registerSuccess(response.data));
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

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    dispatch(actions.loginSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(actions.loginError(errorMessage));
    throw error;
  }
};

export { register, login };