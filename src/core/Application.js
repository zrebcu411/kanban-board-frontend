// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Redirect, Switch, Router, Route } from 'react-router-dom';

import { history } from './history';

import { client } from './apollo-client.js';

export const Application = () => (
  <Router history={history}>
    <Switch>
      <Route path="/signin" component={() => <div>s</div>} />
      {/* TODO: change to private route */}
      <Route
        render={() => (
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/" component={() => <div>/</div>} />
              <Redirect to="/" />
            </Switch>
          </ApolloProvider>
        )}
      />
    </Switch>
  </Router>
);
