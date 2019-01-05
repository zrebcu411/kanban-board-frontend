// @flow

import React from 'react';
import { type ContextRouter } from 'react-router';

import { Provider } from './Provider';
import { View } from './View';

type Props = ContextRouter;

export const Board = (props: Props) => {
  const id = props.match.params.id;

  if (!id) return null; // TODO: 404

  return (
    <Provider id={+id}>
      {({ board, loading }) => <View board={board} loading={loading} />}
    </Provider>
  );
};
