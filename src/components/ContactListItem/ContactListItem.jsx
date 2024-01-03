import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOperations';
import styled from 'styled-components';

const ButtonDel = styled.button`
  background-color: #404540; 
  border: none;
  color: white;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  margin-left: 10px;
  font-size: 12px;
  cursor: pointer;
`;

const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li>
      {contact.name}: {contact.number}
      <ButtonDel onClick={() => dispatch(deleteContact(contact.id))}>Delete</ButtonDel>
    </li>
  );
};

export default ContactListItem;