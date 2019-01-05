// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Redirect, Switch, Router, Route } from 'react-router-dom';

import { history } from './history';
import { client } from './apollo-client.js';

import { AuthContextProvider } from '../context/AuthContext';
import { PrivateRoute } from './PrivateRoute';

import { Layout } from '../layout';

import { SignUp } from '../views/signup';
import { SignIn } from '../views/signin';
import { Board } from '../views/board';

import 'antd/dist/antd.css';

export const Application = () => (
  <Router history={history}>
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />

          <PrivateRoute
            render={() => (
              <Layout>
                <Switch>
                  <Route path="/board/:id" component={Board} />
                  <Redirect to="/" />
                </Switch>
              </Layout>
            )}
          />
        </Switch>
      </ApolloProvider>
    </AuthContextProvider>
  </Router>
);
