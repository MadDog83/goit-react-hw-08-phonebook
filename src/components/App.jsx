import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as contactActions } from '../redux/contactsSlice';
import { addContact, fetchContacts } from '../redux/contactsOperations';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Box } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterFormPage from '../pages/RegisterFormPage';
import LoginFormPage from '../pages/LoginFormPage';
import Navigation from './Navigation/Navigation';
import UserMenu from './UserMenu/UserMenu';
import PrivateRoute from './PrivateRoute'; 
import { ChakraProvider } from "@chakra-ui/react";
import { actions as authActions } from '../redux/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state.contacts);
  const [isAppLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, consider the user as logged in
      dispatch(authActions.loginSuccess({ token }));
    }
    dispatch(fetchContacts());
    setAppLoaded(true); // Set app as loaded after checking the token
  }, [dispatch]); 

  const handleAddContact = newContact => {
    const doesExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (doesExist) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const handleFilterChange = event => dispatch(contactActions.setFilter(event.target.value));

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (!isAppLoaded) {
    return <div>Loading...</div>; // Show a loading component while the app is loading
  }

  return (
    <ChakraProvider>
      <Router>
        <Navigation />
        <UserMenu />
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
          <Routes>
            <Route path="/register" element={<RegisterFormPage />} />
            <Route path="/login" element={<LoginFormPage />} />
            <Route path="/contacts" element={
              <PrivateRoute>
                <>
                  <h1>Phonebook</h1>
                  <ContactForm onAdd={handleAddContact} />
                  <h2>Contacts</h2>
                  <Filter value={filter} onChange={handleFilterChange} />
                  <ContactList contacts={filteredContacts} onDelete={contactActions.deleteContact} />
                </>
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;