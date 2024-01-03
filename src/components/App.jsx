import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../redux/contactsSlice';
import { addContact, fetchContacts } from '../redux/contactsOperations';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
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

  const handleFilterChange = event => dispatch(actions.setFilter(event.target.value));

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <CenteredContainer>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={actions.deleteContact} />
    </CenteredContainer>
  );
};

export default App;