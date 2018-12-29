// @flow

import type {
  Board,
  Board_board,
  BoardVariables as BoardVariablesT,
  AddLane,
  AddLane_createLane,
  AddLaneVariables as AddLaneVariablesT,
  AddCard,
  AddCard_createCard,
  AddCardVariables as AddCardVariablesT
} from '../../types/graphql.js';

export type BoardQuery = Board;

export type BoardT = Board_board;

export type BoardVariables = BoardVariablesT;

export type AddLaneVariables = AddLaneVariablesT;

export type AddLaneResult = AddLane;

export type Lane = AddLane_createLane;

export type AddCardVariables = AddCardVariablesT;

export type AddCardResult = AddCard;

export type Card = AddCard_createCard;
