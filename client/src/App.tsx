import React, { FC, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import './App.scss';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { AuthContext } from 'contexts/AuthContext';
import { Home } from 'pages/Home';
import { SignIn, Signup } from 'pages';
import { Cart } from 'pages/Cart';
import { Order } from 'pages/Order';

const App: FC = () => {
  const { fetching } = useContext(AuthContext);
  return (
    <div className="App">
      <div className="App-body">
        {!fetching ? (
          <Switch>
            <Route path="/signup">
              <ProtectedRoute noLogin component={Signup} />
              {/* <Signup /> */}
            </Route>
            <Route path="/signin">
              <ProtectedRoute noLogin component={SignIn} />
              {/* <SignIn /> */}
            </Route>
            <Route path="/" exact>
              <ProtectedRoute component={Home} />
            </Route>
            <Route path="/cart">
              <ProtectedRoute component={Cart} />
            </Route>
            <Route path="/order">
              <ProtectedRoute component={Order} />
            </Route>
          </Switch>
        ) : (
          <CircularProgress size={20} style={{ marginRight: 20 }} />
        )}
      </div>
    </div>
  );
};

export default App;
