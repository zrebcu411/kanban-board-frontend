// @flow

import React from 'react';
import { Query, type QueryRenderProps } from 'react-apollo';

import { ME_QUERY } from './queries';
import type { MeQuery, Me } from './types';

type Props = {|
  children: ({ loading: boolean, me: ?Me }) => React$Node
|};

export const Provider = (props: Props) => {
  return (
    <Query query={ME_QUERY}>
      {({ data, error, loading }: QueryRenderProps<MeQuery, {}>) => {
        if (error) {
          console.log(error);
        }
        return props.children({ loading, me: getMe(data) });
      }}
    </Query>
  );
};

function getMe(data) {
  if (data && data.me) {
    return data.me;
  }
  return null;
}
