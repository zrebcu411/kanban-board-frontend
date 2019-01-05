// @flow

import gql from 'graphql-tag';

export const ADD_BOARD_MUTATION = gql`
  mutation AddBoard($title: String!, $private: Boolean!, $color: String!) {
    createBoard(title: $title, private: $private, color: $color) {
      id
    }
  }
`;

export const ADD_LANE_MUTATION = gql`
  mutation AddLane($boardId: Int!, $title: String!) {
    createLane(boardId: $boardId, title: $title) {
      id
      title
    }
  }
`;

export const ADD_CARD_MUTATION = gql`
  mutation AddCard($boardId: Int!, $laneId: Int!, $title: String!) {
    createCard(boardId: $boardId, laneId: $laneId, title: $title) {
      id
      title
    }
  }
`;
