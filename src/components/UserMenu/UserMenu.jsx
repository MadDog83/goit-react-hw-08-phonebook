import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../redux/authSlice';
import { Box, Button, Text } from '@chakra-ui/react';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(actions.logout());
    navigate('/login'); 
  };

  return (
    <Box>
      {authState && authState.user && <Text>Welcome, {authState.user.email}</Text>}
      {authState && authState.user && <Button onClick={handleLogout} colorScheme="teal">Logout</Button>}
    </Box>
  );
};

export default UserMenu;