// @flow

import React from 'react';
import BoardComponent from 'react-trello';
import { Icon, Divider, Avatar as AntAvatar, Dropdown, Menu, Spin } from 'antd';
import styled from 'styled-components';

import { If, Loader } from '../../components';
import * as User from '../../domain/user';
import { MeProvider } from '../../providers';

import { Card } from './Card';
import { AddCardTemplate } from './AddCardTemplate';
import { AddLaneTemplate } from './AddLaneTemplate';

import type { BoardT } from './types';

type Props = {|
  board: ?BoardT,
  loading: boolean
|};

export const View = (props: Props) => {
  if (props.loading) return <Loader center />;

  if (!props.board) return null;

  return (
    <Container background={props.board.color}>
      <Header board={props.board} />
      <BoardContainer>
        <BoardComponent
          data={{ lanes: props.board.lanes || [] }}
          className="kanban-board"
          draggable
          editable
          canAddLanes
          newCardTemplate={<AddCardTemplate boardId={+props.board.id} />}
          newLaneTemplate={<AddLaneTemplate boardId={+props.board.id} />}
          customCardLayout
        >
          {/* $FlowFixMe */}
          <Card />
        </BoardComponent>
      </BoardContainer>
    </Container>
  );
};

const MeDropdown = props => (
  <MeProvider>
    {({ me, loading }) => (
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            {loading && (
              <Menu.Item key="loading">
                <Spin size="small" />
              </Menu.Item>
            )}

            {!loading && me && (
              <Menu.Item key={me.id}>
                <Me>
                  <AntAvatar size="large">
                    {User.getInitials(me.name)}
                  </AntAvatar>
                  <Right>
                    <Name>{me.name}</Name>
                    <Email>{me.email}</Email>
                  </Right>
                </Me>
              </Menu.Item>
            )}
            <Menu.Divider />
            <Menu.Item>Edit profile...</Menu.Item>
          </Menu>
        }
      >
        <Item>
          <Avatar>
            {loading || !me ? undefined : User.getInitials(me.name)}
          </Avatar>
        </Item>
      </Dropdown>
    )}
  </MeProvider>
);

const Header = props => (
  <HeaderBar>
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
        <Icon type="team" />
        <IconTitle>Public</IconTitle>
      </If>
    </Item>
    <Divider type="vertical" />

    <MeDropdown />
  </HeaderBar>
);

const Container = styled.div`
  background-color: ${p => p.background || 'red'};
  padding-top: 40px;
  margin-top: -40px;

  .kanban-board {
    background-color: transparent;
    height: calc(100vh - 83px);

    .smooth-dnd-container {
      &:last-child {
        section {
          background-color: rgba(0, 0, 0, 0.15);
        }
        button:not(.ant-btn) {
          background-color: transparent;
          outline: none;
        }
      }
    }

    .react-trello-lane {
      padding-bottom: 5px;

      header {
        z-index: 500;
      }

      > div {
        margin-bottom: 0;
        padding-bottom: 0;
        max-height: 84vh;
        position: relative;

        > a {
          position: static;
        }
      }
    }
  }
`;

const BoardContainer = styled.div``;

const HeaderBar = styled.div`
  display: flex;
  padding: 12px 15px 0 15px;
  align-items: center;
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
  &.ant-avatar-circle {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
`;

const Me = styled.div`
  display: flex;
`;

const Right = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const Name = styled.div`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
`;

const Email = styled.div`
  font-size: 14px;
`;
