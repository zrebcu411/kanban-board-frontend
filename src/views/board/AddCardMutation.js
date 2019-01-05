// @flow

import React from 'react';
import { Mutation, type MutationFunction } from 'react-apollo';
import { Button } from 'antd';
import * as R from 'ramda';

import * as Messages from '../../domain/messages';

import { ADD_CARD_MUTATION } from './mutations';

import type {
  AddCardResult,
  Card,
  AddCardVariables as Variables
} from './types';

type Props = {|
  boardId: number,
  laneId: number,
  title: string,
  description: string,
  onAdd: (card: Card) => void
|};

export const AddCardMutation = (props: Props) => (
  <Mutation mutation={ADD_CARD_MUTATION}>
    {(addCard: MutationFunction<AddCardResult, Variables>, { loading }) => (
      <Button
        type="primary"
        size="small"
        loading={loading}
        disabled={R.isEmpty(props.title) || R.isEmpty(props.description)}
        onClick={() =>
          addCard({
            variables: {
              boardId: props.boardId,
              laneId: props.laneId,
              title: props.title,
              description: props.description
            }
          })
            .then(res => {
              if (res && res.data) {
                props.onAdd({
                  id: res.data.createCard.id,
                  title: res.data.createCard.title,
                  description: res.data.createCard.description,
                  createdAt: res.data.createCard.createdAt
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
