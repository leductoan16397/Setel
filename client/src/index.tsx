/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { AuthContextProvider } from 'contexts/AuthContext';
import { createBrowserHistory } from 'history';
import { Router, withRouter } from 'react-router-dom';
import { refreshToken } from 'api';
import { getAuth, storageAuth } from 'utils';
import { CircularProgress } from '@mui/material';
import { CartContextProvider } from 'contexts/CartContext';
import App from './App';
import * as serviceWorker from './serviceWorker';

const customHistory = createBrowserHistory();
const AppRootWithRouter = withRouter(App);

const Root: FC = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchUser() {
      try {
        const user = getAuth();
        if (user && new Date() > new Date(user.expires)) {
          const data = await refreshToken(user.refreshToken);
          storageAuth({ ...user, accessToken: data.accessToken, expires: data.expires });
        }
      } catch (error) {
        storageAuth(null);
      }
      setLoaded(true);
    }
    fetchUser();
  }, []);

  return loaded ? (
    <Router history={customHistory}>
      <AuthContextProvider>
        <CartContextProvider>
          <AppRootWithRouter />
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  ) : (
    <CircularProgress size={20} style={{ marginRight: 20 }} />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
