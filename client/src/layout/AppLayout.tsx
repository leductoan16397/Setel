/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactNode, useContext } from 'react';
import { Container, Box, AppBar, Toolbar, Button, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import './AppLayout.scss';

const ButtonLink = styled(Link)({
  textDecoration: 'none',
  color: 'white',
});

export const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { logedUserToken, userInfo, doSignOut } = useContext(AuthContext);

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: '#ebebeb', height: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit">
                <ButtonLink to="/">Home</ButtonLink>
              </Button>
            </Typography>
            <Button color="inherit">
              <ButtonLink to="/order">Order</ButtonLink>
            </Button>
            <Button color="inherit">
              <ButtonLink to="/cart">Cart</ButtonLink>
            </Button>
            <Button color="inherit" onClick={() => doSignOut()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div className="content">{children}</div>
      </Box>
    </Container>
  );
};
