// @flow

import gql from 'graphql-tag';

export const BOARD_QUERY = gql`
  query Board($id: Int!) {
    board(id: $id) {
      id
      title
      color
      private
      lanes {
        id
        title
        cards {
          id
          title
        }
      }
    }
  }
`;
