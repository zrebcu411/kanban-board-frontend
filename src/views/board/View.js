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
        <Item>
          <Icon type="star" />
        </Item>
        <Divider type="vertical" />
        <Item>
          <If cond={props.board.private}>
            <Icon type="lock" />
            <IconTitle>Private</IconTitle>
          </If>
          <If cond={!props.board.private}>
            <Icon type="unlock" />
            <IconTitle>Public</IconTitle>
          </If>
        </Item>
        <Divider type="vertical" />
        <Item>
          <Avatar icon="user" />
        </Item>
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
  padding: 12px 15px 0 15px;
  align-items: center;
  background-color: #3179ba;
  color: #fff;
`;

const Title = styled.h2`
  margin: 0;
  color: #fff;
  font-style: italic;
  font-weight: 600;
  padding-right: 15px;
`;

const Item = styled.div`
  padding: 0 6px;
  cursor: pointer;
`;

const IconTitle = styled.span`
  margin-left: 5px;
`;

const Avatar = styled(AntAvatar)`
  cursor: pointer;
  width: 30px !important;
  height: 30px !important;
`;
