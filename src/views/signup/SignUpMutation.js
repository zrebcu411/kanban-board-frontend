// @flow

import React from 'react';
import {
  Mutation,
  type MutationFunction,
  type MutationResult
} from 'react-apollo';
import gql from 'graphql-tag';

import type { Values, Response } from './types';

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      result {
        token
      }
      errors
    }
  }
`;

type Props = {|
  children: ((Values) => Promise<*>, result: MutationResult<any>) => React$Node
|};

export const SignUpMutation = (props: Props) => {
  return (
    <Mutation mutation={SIGN_UP_MUTATION}>
      {(signup: MutationFunction<Response, Values>, result) => {
        return props.children(
          variables => signup({ variables }).then(getData),
          result
        );
      }}
    </Mutation>
  );
};

function getData(res) {
  if (res && res.data) {
    return res.data.signup;
  }
  return {
    errors: [],
    result: null
  };
}
