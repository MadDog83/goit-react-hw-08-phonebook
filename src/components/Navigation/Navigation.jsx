import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { useMatch, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const match = useMatch("/:page");
  const authState = useSelector(state => state.auth);

  return (
    <Box bg="teal.500" p={4}>
      <ButtonGroup variant="outline" spacing="6">
        <Button as={RouterLink} to="/register" colorScheme={match?.params.page === 'register' ? 'pink' : 'teal'}>
          Register
        </Button>
        <Button as={RouterLink} to="/login" colorScheme={match?.params.page === 'login' ? 'pink' : 'teal'}>
          Login
        </Button>
        {authState && authState.user && (
          <Button as={RouterLink} to="/contacts" colorScheme={match?.params.page === 'contacts' ? 'pink' : 'teal'}>
            Contacts
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
};

export default Navigation;