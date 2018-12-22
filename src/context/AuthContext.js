// @flow

import React, { Component, type ComponentType } from 'react';
import _ from 'lodash/fp';

import { LS_AUTH_KEY } from 'core/config';
import type { AuthState, Credentials } from './types';
import * as ApiAuth from './api';

type State = {
  auth: null | AuthState,
  signIn: (credentials: Credentials) => Promise<*>,
  setToken: (auth: AuthState) => void,
  signOut: () => void,
  isLoggedIn: () => boolean
};

function getInitialState(methods) {
  return {
    auth: null,
    ...methods
  };
}

function stubReject(c: Credentials) {
  return Promise.reject();
}

const { Provider, Consumer } = React.createContext(
  getInitialState({
    signIn: stubReject,
    signOut: _.noop,
    setToken: _.noop,
    isLoggedIn: _.stubFalse
  })
);

export const AuthContextConsumer = Consumer;

export type AuthContextInjectedProps = State;

export class AuthContextProvider extends Component<
  { children: React$Node },
  State
> {
  constructor() {
    super();

    const auth: null | AuthState = getAuthFromLocalStorage();
    if (isLoggedIn(auth)) {
      this.intervalID = this.startInterval();
    }

    this.state = {
      auth,
      signIn: this.signIn,
      signOut: this.signOut,
      setToken: this.setToken,
      isLoggedIn: this.isLoggedIn
    };
  }

  intervalID: IntervalID;

  setToken = (auth: AuthState) => {
    const item = JSON.stringify(auth);
    window.localStorage.setItem(LS_AUTH_KEY, item);
    this.setState({ auth }, () => {
      this.intervalID = this.startInterval();
    });
  };

  signIn = (credentials: Credentials) => {
    return ApiAuth.signIn(credentials).then(auth => {
      this.setToken(auth);
    });
  };

  signOut = () => {
    removeAuthFromLocalStorage();
    this.setState({ auth: null });
    window.clearInterval(this.intervalID);
  };

  isLoggedIn = () => {
    return isLoggedIn(this.state.auth);
  };

  startInterval(): IntervalID {
    return setInterval(() => {
      const auth: null | AuthState = getAuthFromLocalStorage();
      this.setState(
        state => {
          if (!_.isEqual(state.auth, auth)) {
            return { auth };
          } else {
            return null;
          }
        },
        () => {
          if (!this.isLoggedIn()) {
            this.signOut();
          }
        }
      );
    }, 1000);
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function isLoggedIn(auth) {
  if (!auth) return false;
  return !!auth.accessToken && Date.now() / 1000 <= auth.tokenExpiration;
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

export function removeAuthFromLocalStorage() {
  window.localStorage.removeItem(LS_AUTH_KEY);
}

export function getAccessToken() {
  const auth = getAuthFromLocalStorage();
  if (auth) {
    return auth.accessToken;
  }
  return undefined;
}

export function getAuthFromLocalStorage(): null | AuthState {
  try {
    const item = window.localStorage.getItem(LS_AUTH_KEY);
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
}
