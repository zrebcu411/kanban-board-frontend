// @flow

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Avatar as AntAvatar,
  Dropdown,
  Menu,
  Icon as AntIcon,
  Badge,
  Spin
} from 'antd';

import { authContext } from '../context/AuthContext';
import * as User from '../domain/user';
import { MeProvider } from '../providers';

import { AddBoardModal } from '../views/board/AddBoardModal';
import { BoardsDropdown } from './BoardsDropdown';

type Props = {|
  children: React$Node
|};

export const Layout = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
                  <Github>
                    <ItemTitle>Information</ItemTitle>
                    <ItemDescription>
                      A board is made up of cards ordered on lists. Use it to
                      manage projects, track information, or organize anything.
                    </ItemDescription>
                  </Github>
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
                  <Github>
                    <ItemTitle>Notifications</ItemTitle>
                    <ItemDescription>
                      A board is made up of cards ordered on lists. Use it to
                      manage projects, track information, or organize anything.
                    </ItemDescription>
                  </Github>
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

          <MeDropdown />
        </Right>
      </Bar>
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

const MeDropdown = props => {
  const context = useContext(authContext);

  return (
    <MeProvider>
      {({ me, loading }) => (
        <Dropdown
          trigger={['click']}
          getPopupContainer={node => node.parentNode}
          overlay={
            <Menu>
              {loading && (
                <Menu.Item key="loading">
                  <Spin size="small" />
                </Menu.Item>
              )}

              {!loading && me && (
                <Menu.Item key={me.id} className="hoverless">
                  <Me>
                    <Icon type="user" color="dark" />
                    <MeRight>
                      <Name>{me.name}</Name>
                      <Email>{`(${me.email})`}</Email>
                    </MeRight>
                  </Me>
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item key="contact">
                <Github>Contact</Github>
              </Menu.Item>
              <Menu.Item key="author">
                <Github>Author</Github>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="signout" onClick={() => context.signOut()}>
                <Icon type="logout" color="dark" />
                Sign out
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar>
            {loading || !me ? undefined : User.getInitials(me.name)}
          </Avatar>
        </Dropdown>
      )}
    </MeProvider>
  );
};

const Github = props => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/zrebcu411"
  >
    {props.children}
  </a>
);

const Wrapper = styled.div`
  .ant-dropdown {
    max-width: 300px;
    z-index: 1000;
  }

  .ant-dropdown-menu-item {
    font-size: 15px;
  }

  .hoverless {
    &:hover {
      background-color: initial;
      cursor: initial;
    }
  }
`;

const Content = styled.div`
  height: 100vh;
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
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  position: relative;
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
  color: ${p => (p.color === 'dark' ? 'rgba(0,0,0,0.65)' : undefined)};
`;

export const IconTitle = styled.span`
  color: #fff;
  font-weight: 700;
  padding-left: 5px;
`;

const Avatar = styled(AntAvatar)`
  cursor: pointer;
`;

const Me = styled.div`
  display: flex;
  align-items: center;
`;

const MeRight = styled.div`
  flex: 1;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Email = styled.div`
  padding-left: 4px;
  color: rgba(0, 0, 0, 0.55);
`;
