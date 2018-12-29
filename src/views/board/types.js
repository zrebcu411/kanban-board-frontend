// @flow

import type {
  Board,
  Board_board,
  BoardVariables as BoardVariablesT,
  AddCard,
  AddCard_createCard,
  AddCardVariables as AddCardVariablesT
} from '../../types/graphql.js';

export type BoardQuery = Board;

export type BoardT = Board_board;

export type BoardVariables = BoardVariablesT;

export type AddCardVariables = AddCardVariablesT;

export type AddCardResult = AddCard;

export type Card = AddCard_createCard;
