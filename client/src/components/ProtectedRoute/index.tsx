/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createElement, FC, useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

interface Props {
  component: FC;
  noLogin?: boolean;
}

export const ProtectedRoute: FC<Props> = ({ component, noLogin }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (noLogin) {
    return <Route render={() => (!isLoggedIn ? createElement(component) : <Redirect to="/" />)} />;
  }
  return (
    <Route render={() => (isLoggedIn ? createElement(component) : <Redirect to="/signin" />)} />
  );
};
