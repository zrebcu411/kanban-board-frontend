// @flow

import React from 'react';
import { Query, type QueryRenderProps } from 'react-apollo';

import { BOARD_QUERY } from './queries';
import type { BoardQuery, BoardT, BoardVariables as Variables } from './types';

type Props = {|
  id: number,
  children: ({ loading: boolean, board: null | BoardT }) => React$Node
|};

export const Provider = (props: Props) => {
  return (
    <Query query={BOARD_QUERY} variables={{ id: props.id }}>
      {({ data, error, loading }: QueryRenderProps<BoardQuery, Variables>) => {
        if (error) {
          console.log(error);
        }
        return props.children({ loading, board: getBoard(data) });
      }}
    </Query>
  );
};

function getBoard(data) {
  if (data && data.board) {
    return data.board;
  }
  return null;
}
