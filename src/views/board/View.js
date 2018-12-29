// @flow

import React from 'react';
import BoardComponent from 'react-trello';

import { AddCardTemplate } from './AddCardTemplate';
import { AddLaneTemplate } from './AddLaneTemplate';

import type { BoardT } from './types';

type Props = {|
  board: ?BoardT
|};

export const View = (props: Props) => {
  if (!props.board) return null;

  return (
    <BoardComponent
      data={{ lanes: props.board.lanes }}
      draggable
      editable
      canAddLanes
      onCardAdd={(card, id) => console.log(id, card)}
      newCardTemplate={<AddCardTemplate />}
      newLaneTemplate={<AddLaneTemplate />}
      // addCardLink={<div>ss</div>}
    />
  );
};
