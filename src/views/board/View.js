// @flow

import React from 'react';
import BoardComponent from 'react-trello';
import { Icon, Divider, Avatar as AntAvatar } from 'antd';
import styled from 'styled-components';

import { If } from '../../components';

import { AddCardTemplate } from './AddCardTemplate';
import { AddLaneTemplate } from './AddLaneTemplate';

import type { BoardT } from './types';

type Props = {|
  board: ?BoardT
|};

export const View = (props: Props) => {
  if (!props.board) return null;

  return (
    <Container>
      <Header>
        <Title>{props.board.title}</Title>
        <Icon type="star" />
        <Divider type="vertical" />
        <If cond={props.board.private}>
          <Icon type="lock" />
          <span>Private</span>
        </If>
        <If cond={!props.board.private}>
          <Icon type="unlock" />
          <span>Public</span>
        </If>
        <Divider type="vertical" />
        <Avatar icon="user" size="small" />
      </Header>
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
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  padding: 5px 25px;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const Avatar = styled(AntAvatar)`
  cursor: pointer;
`;
