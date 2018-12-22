// @flow

import { ApolloClient, ApolloLink, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

// import { getAccessToken } from 'context/AuthContext';

// $FlowFixMe
const API_GRAPHQL: string = process.env.REACT_APP_API_GRAPHQL;

const ErrorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const locationStr = JSON.stringify(locations, null, 2);
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locationStr}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const AuthLink = setContext((_, { headers }) => {
  return new Promise(resolve => {
    // const token = getAccessToken();
    resolve();
    //   {
    //   headers: {
    //     ...headers,
    //     Authorization: token ? `Bearer ${token}` : ''
    //   }
    // }
  });
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    AuthLink,
    ErrorLink,
    new HttpLink({ uri: API_GRAPHQL })
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true
});
