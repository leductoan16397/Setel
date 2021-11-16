/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { signIn, signUp, refreshToken, signOut, signOutAll } from 'api';
import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, storageAuth, Toast } from 'utils';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [logedUserToken, setlogedUserToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [fetching, setFeching] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = getAuth();
        if (user) {
          setlogedUserToken(user.accessToken);
          setUserInfo(user);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
        setFeching(false);
      } catch (error) {
        setFeching(false);
      }
    }
    fetchUser();
  }, []);

  const doSignIn = async (email, password) => {
    try {
      const data = await signIn(email, password);
      setlogedUserToken(data.accessToken);
      setUserInfo(data);
      storageAuth(data);
      setLoggedIn(true);
      Toast('Success!!', 'Login Successfully', 'success');
      history.push('/');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  const doRefreshToken = async (token) => {
    try {
      const data = await refreshToken(token);
      setlogedUserToken(data.accessToken);
      setUserInfo({ ...userInfo, accessToken: data.accessToken, expires: data.expires });
      storageAuth({ ...userInfo, accessToken: data.accessToken, expires: data.expires });
      return data.accessToken;
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  const getAccessToken = async () => {
    if (new Date() < new Date(userInfo.expires)) {
      return logedUserToken;
    }
    const newToken = await doRefreshToken(userInfo.refreshToken);
    return newToken;
  };

  const doSignOut = async () => {
    try {
      const accesstoken = await getAccessToken();
      await signOut(accesstoken, userInfo.refreshToken);
      setlogedUserToken(undefined);
      setUserInfo(undefined);
      storageAuth(null);
      setLoggedIn(false);
      Toast('Success!!', 'Logged out successfully!', 'success');
      history.push('/signin');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  const doSignOutAll = async (accessToken) => {
    try {
      await signOutAll(accessToken);
      setlogedUserToken(undefined);
      setUserInfo(undefined);
      storageAuth(null);
      setLoggedIn(false);
      Toast('Success!!', 'Logged out successfully!', 'success');
      history.push('/signin');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  const doSignUp = async ({ email, password, fullName }) => {
    try {
      const data = await signUp({ email, password, fullName });
      Toast('Success!!', 'Signup was successful', 'success');
      history.push('/signin');
    } catch (error) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        fetching,
        userInfo,
        setUserInfo,
        logedUserToken,
        setlogedUserToken,
        doSignIn,
        doSignUp,
        doSignOut,
        doSignOutAll,
        doRefreshToken,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
