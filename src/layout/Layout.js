// @flow

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Avatar as AntAvatar,
  Dropdown,
  Menu,
  Icon as AntIcon,
  Badge
} from 'antd';

import { authContext } from '../context/AuthContext';
import { BoardsDropdown } from './BoardsDropdown';
import { AddBoardModal } from '../views/board/AddBoardModal';

type Props = {|
  children: React$Node
|};

export const Layout = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const context = useContext(authContext);

  return (
    <Wrapper>
      <AddBoardModal visible={modalVisible} onToggle={toggleModal} />

      <Bar>
        <Left>
          <Link to="/">
            <Square>
              <Icon type="home" />
            </Square>
          </Link>
          <BoardsDropdown onAddBoardClick={toggleModal} />
        </Left>

        <Center>
          <Logo>
            <Icon type="project" />
            <IconTitle>Kanban board frontend</IconTitle>
          </Logo>
        </Center>

        <Right>
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            getPopupContainer={node => node.parentNode}
            overlay={
              <Menu>
                <Menu.Item onClick={() => toggleModal()}>
                  <ItemTitle>Create board...</ItemTitle>
                  <ItemDescription>
                    A board is made up of cards ordered on lists. Use it to
                    manage projects, track information, or organize anything.
                  </ItemDescription>
                </Menu.Item>
              </Menu>
            }
          >
            <Square>
              <Icon type="plus" />
            </Square>
          </Dropdown>

          <Dropdown
            trigger={['click']}
            getPopupContainer={node => node.parentNode}
            overlay={
              <Menu>
                <Menu.Item>
                  <ItemTitle>Information</ItemTitle>
                  <ItemDescription>
                    A board is made up of cards ordered on lists. Use it to
                    manage projects, track information, or organize anything.
                  </ItemDescription>
                </Menu.Item>
              </Menu>
            }
          >
            <Square>
              <Icon type="info-circle" />
            </Square>
          </Dropdown>

          <Dropdown
            trigger={['click']}
            getPopupContainer={node => node.parentNode}
            overlay={
              <Menu>
                <Menu.Item>
                  <ItemTitle>Notifications</ItemTitle>
                  <ItemDescription>
                    A board is made up of cards ordered on lists. Use it to
                    manage projects, track information, or organize anything.
                  </ItemDescription>
                </Menu.Item>
              </Menu>
            }
          >
            <Square>
              <Badge dot>
                <Icon type="bell" />
              </Badge>
            </Square>
          </Dropdown>

          <Dropdown
            trigger={['click']}
            getPopupContainer={node => node.parentNode}
            overlay={
              <Menu>
                <Menu.Item onClick={() => context.signOut()}>
                  Sign out
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar icon="user" />
          </Dropdown>
        </Right>
      </Bar>
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ant-dropdown {
    max-width: 300px;
  }

  .ant-dropdown-menu-item {
    font-size: 15px;
  }
`;

const Content = styled.div`
  height: calc(100vh - 40px);
  overflow: hidden;
`;

const Logo = styled.h1`
  opacity: 0.5;
  color: #fff;
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;
  transition: all 0.15s;
  font-size: initial;
  font-style: italic;

  &:hover {
    opacity: 0.8;
  }
`;

const Bar = styled.div`
  padding: 0 6px;
  height: 40px;
  background-color: #026aa7;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
`;

const Center = styled.div`
  display: flex;
`;

export const Square = styled.div`
  background-color: hsla(0, 0%, 100%, 0.3);
  min-width: 32px;
  height: 32px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-right: 4px;
  transition: all 0.15s;
  padding: 7px;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.2);
  }
`;

const ItemDescription = styled.div`
  font-size: 11px;
  line-height: 1.4;
  overflow-wrap: break-word;
  white-space: normal;
`;

const ItemTitle = styled.div`
  margin-bottom: 3px;
`;

export const Icon = styled(AntIcon)`
  color: #fff;
  font-size: 17px;
  font-weight: 700;
`;

export const IconTitle = styled.span`
  color: #fff;
  font-weight: 700;
  padding-left: 5px;
`;

const Avatar = styled(AntAvatar)`
  cursor: pointer;
`;
