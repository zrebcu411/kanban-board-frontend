// @flow

import React from 'react';
import { Mutation, type MutationFunction } from 'react-apollo';

import { ADD_BOARD_MUTATION } from './mutations';
import { BOARDS_QUERY } from '../../providers/boards/queries.js';

import type {
  AddBoardResult,
  BoardMutationT as Board,
  AddBoardVariables as Variables
} from './types';

type Props = {|
  children: (
    addBoard: (variables: Variables) => Promise<Board>,
    loading: boolean
  ) => React$Node
|};

export const AddBoardMutation = (props: Props) => (
  <Mutation
    mutation={ADD_BOARD_MUTATION}
    refetchQueries={[{ query: BOARDS_QUERY }]}
  >
    {(addBoard: MutationFunction<AddBoardResult, Variables>, { loading }) =>
      props.children(
        variables =>
          addBoard({ variables }).then(res => {
            if (res && res.data) {
              return Promise.resolve(res.data.createBoard);
            } else {
              return Promise.reject();
            }
          }),
        loading
      )
    }
  </Mutation>
);
