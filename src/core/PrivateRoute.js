// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';

import { AuthContextConsumer } from '../context/AuthContext';

type Props = {|
  render: (router: ContextRouter) => React$Node
|};

export const PrivateRoute = (props: Props) => {
  return (
    <AuthContextConsumer>
      {context => {
        if (context.isLoggedIn()) {
          return <Route {...props} />;
        }
        return <Redirect to="/signin" />;
      }}
    </AuthContextConsumer>
  );
};
