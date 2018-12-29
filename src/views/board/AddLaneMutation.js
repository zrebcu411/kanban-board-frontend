// @flow

import React from 'react';
import { Mutation, type MutationFunction } from 'react-apollo';
import { Button } from 'antd';
import * as R from 'ramda';

import * as Messages from '../../domain/messages';

import { ADD_LANE_MUTATION } from './mutations';

import type {
  AddLaneResult,
  Lane,
  AddLaneVariables as Variables
} from './types';

type Props = {|
  boardId: number,
  title: string,
  onAdd: (lane: Lane) => void
|};

export const AddLaneMutation = (props: Props) => (
  <Mutation mutation={ADD_LANE_MUTATION}>
    {(addLane: MutationFunction<AddLaneResult, Variables>, { loading }) => (
      <Button
        type="primary"
        size="small"
        loading={loading}
        disabled={R.isEmpty(props.title)}
        onClick={() =>
          addLane({
            variables: {
              boardId: props.boardId,
              title: props.title
            }
          })
            .then(res => {
              if (res && res.data) {
                props.onAdd({
                  id: res.data.createLane.id,
                  title: res.data.createLane.title
                });
              }
            })
            .catch(() => Messages.error())
        }
      >
        Add
      </Button>
    )}
  </Mutation>
);
