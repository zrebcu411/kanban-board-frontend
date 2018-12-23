// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Redirect, Switch, Router, Route } from 'react-router-dom';

import { history } from './history';
import { client } from './apollo-client.js';

import { SignUp } from '../views/signup';

import 'antd/dist/antd.css';

export const Application = () => (
  <Router history={history}>
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/signup" component={SignUp} />
        {/* TODO: change to private route */}
        <Route
          render={() => (
            <Switch>
              <Route path="/" component={() => <div>/</div>} />
              <Redirect to="/" />
            </Switch>
          )}
        />
      </Switch>
    </ApolloProvider>
  </Router>
);
