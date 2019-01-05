// @flow

import React, { Component, type ComponentType } from 'react';
import decodeJwt from 'jwt-decode';
import * as R from 'ramda';

import { client } from '../core/apollo-client';
import type { Auth } from './types';

const LS_AUTH_KEY = 'kanban-board-frontend-ls-auth-key';

type State = {
  auth: null | Auth,
  setAuth: (token: string) => void,
  signOut: () => void,
  isLoggedIn: () => boolean
};

function noop() {
  return R.always(undefined);
}

const initialState = {
  auth: null,
  signOut: noop(),
  setAuth: noop(),
  isLoggedIn: R.always(false)
};

export const authContext = React.createContext<State>(initialState);

const { Provider, Consumer } = authContext;

export const AuthContextConsumer = Consumer;

export type AuthContextInjectedProps = State;

export class AuthContextProvider extends Component<
  { children: React$Node },
  State
> {
  constructor() {
    super();

    const auth: null | Auth = getAuthFromLocalStorage();

    this.state = {
      auth,
      signOut: this.signOut,
      setAuth: this.setAuth,
      isLoggedIn: this.isLoggedIn
    };
  }

  setAuth = (token: string) => {
    const auth = decodeToken(token);
    const item = JSON.stringify(auth);
    window.localStorage.setItem(LS_AUTH_KEY, item);
    this.setState({ auth });
  };

  signOut = () => {
    removeAuthFromLocalStorage();
    client.clearStore();
    this.setState({ auth: null });
  };

  isLoggedIn = () => {
    return isLoggedIn(this.state.auth);
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function isLoggedIn(auth) {
  if (!auth) return false;
  return !!auth.token && Date.now() / 1000 <= auth.tokenExpiration;
}

export function withAuthContext<Props: Object>(
  Component: ComponentType<Props>
): ComponentType<$Diff<Props, State>> {
  return function AuthContextConsumerWrapper(props: Props) {
    return (
      <AuthContextConsumer>
        {context => <Component {...context} {...props} />}
      </AuthContextConsumer>
    );
  };
}

function removeAuthFromLocalStorage() {
  window.localStorage.removeItem(LS_AUTH_KEY);
}

export function getAccessToken() {
  const auth = getAuthFromLocalStorage();
  if (auth) {
    return auth.token;
  }
  return undefined;
}

function getAuthFromLocalStorage(): null | Auth {
  try {
    const item = window.localStorage.getItem(LS_AUTH_KEY);
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
}

function decodeToken(token: string): Auth {
  const decoded = decodeJwt(token);
  const { exp, sub } = decoded;
  return { token, tokenExpiration: exp, clientId: sub };
}
