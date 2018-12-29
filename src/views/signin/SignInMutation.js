// @flow

import React from 'react';
import {
  Mutation,
  type MutationFunction,
  type MutationResult
} from 'react-apollo';
import gql from 'graphql-tag';

import type { Values, Result } from './types';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      result {
        token
      }
      errors
    }
  }
`;

type Props = {|
  children: (
    (credentials: Values) => Promise<*>,
    result: MutationResult<Result>
  ) => React$Node
|};

export const SignInMutation = (props: Props) => {
  return (
    <Mutation mutation={SIGN_IN_MUTATION}>
      {(signin: MutationFunction<Result, Values>, result) => {
        return props.children(
          variables => signin({ variables }).then(getData),
          result
        );
      }}
    </Mutation>
  );
};

function getData(res) {
  if (res && res.data) {
    return res.data.signin;
  }
  return {
    errors: [],
    result: null
  };
}
