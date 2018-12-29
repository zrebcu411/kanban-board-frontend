// @flow

import gql from 'graphql-tag';

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
