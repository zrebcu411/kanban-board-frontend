// @flow

import React, { Component } from 'react';

import { Provider } from './Provider';
import { View } from './View';

type Props = {||};

type State = {};

export class Board extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Provider id={11}>
        {({ board, loading }) => <View board={board} />}
      </Provider>
    );
  }
}
