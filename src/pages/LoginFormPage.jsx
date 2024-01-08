import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authOperations'; 
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const LoginFormPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector(state => state.auth.error);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password, rememberMe }))
      .then((resultAction) => {
        if (resultAction.type === 'auth/loginSuccess') {
          setEmail('');
          setPassword('');
          navigate('/contacts');
        }
      });
  };

  return (
    <Box p={5} bgGradient="linear(to-r, teal.500, green.500)" borderRadius="md">
      <Text fontSize="2xl" mb={5} color="white">Login</Text>
      {authError && <Text color="red.500">{authError}</Text>}
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel color="white">Email:</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel color="white">Password:</FormLabel>
          <Input type="password" value={password} onChange={handlePasswordChange} />
        </FormControl>
        <Checkbox color="white" mt={4} onChange={handleRememberMeChange}>Remember me</Checkbox>
        <Button mt={4} colorScheme="teal" size="lg" width="full" type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default LoginFormPage;