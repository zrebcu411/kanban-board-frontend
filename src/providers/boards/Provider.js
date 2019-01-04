// @flow

import React from 'react';
import { Query, type QueryRenderProps } from 'react-apollo';

import { BOARDS_QUERY } from './queries';
import type { BoardsQuery, BoardT } from './types';

type Props = {|
  children: ({ loading: boolean, boards: Array<BoardT> }) => React$Node
|};

export const Provider = (props: Props) => {
  return (
    <Query query={BOARDS_QUERY}>
      {({ data, error, loading }: QueryRenderProps<BoardsQuery, {}>) => {
        if (error) {
          console.log(error);
        }
        return props.children({ loading, boards: getBoards(data) });
      }}
    </Query>
  );
};

function getBoards(data) {
  if (data && data.boards) {
    return data.boards;
  }
  return [];
}
