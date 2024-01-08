import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../redux/authSlice';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(actions.loginSuccess({ token, user }));
    } else if (!isLoggedIn) {
      navigate('/login');
    }
  }, [dispatch, isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export default PrivateRoute;