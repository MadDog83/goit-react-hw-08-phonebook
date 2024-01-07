import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authOperations';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const RegisterFormPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const registerError = useSelector(state => state.auth.error);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box p={5} bgGradient="linear(to-r, teal.500, green.500)" borderRadius="md">
      <Text fontSize="2xl" mb={5} color="white">Register</Text>
      {registerError && <Text color="red.500">{registerError}</Text>}
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel color="white">Name:</FormLabel>
          <Input type="text" value={name} onChange={handleNameChange} />
        </FormControl>
        <FormControl id="email" isRequired mt={4}>
          <FormLabel color="white">Email:</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel color="white">Password:</FormLabel>
          <Input type="password" value={password} onChange={handlePasswordChange} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">Register</Button>
      </form>
    </Box>
  );
};

export default RegisterFormPage;