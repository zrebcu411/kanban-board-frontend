// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import * as R from 'ramda';
import { Dropdown, Menu, Spin, Avatar } from 'antd';
import styled from 'styled-components';

import { If } from '../components';
import { BoardsProvider } from '../providers';
import { Square, Icon, IconTitle } from './Layout';

type Props = {|
  onAddBoardClick: () => void
|};

export const BoardsDropdown = (props: Props) => (
  <BoardsProvider>
    {({ boards, loading }) => (
      <Container>
        <Dropdown
          trigger={['click']}
          getPopupContainer={node => node.parentNode}
          overlay={
            <Menu>
              <If cond={loading}>
                <Menu.Item key="loading">
                  <Spin size="small" />
                </Menu.Item>
              </If>

              {boards.map(board => (
                <Menu.Item key={board.id}>
                  <Link to={`/board/${board.id}`}>
                    <Item>
                      <Color color={board.color}>
                        {getLetter(board.title)}
                      </Color>
                      <Right>
                        <Title>{board.title}</Title>
                        <Description>{board.description || 'temp'}</Description>
                      </Right>
                    </Item>
                  </Link>
                </Menu.Item>
              ))}

              {!R.isEmpty(boards) && <Menu.Divider />}

              <Menu.Item onClick={() => props.onAddBoardClick()}>
                Create board...
              </Menu.Item>
            </Menu>
          }
        >
          <Square>
            <Icon type="project" />
            <IconTitle>Boards</IconTitle>
          </Square>
        </Dropdown>
      </Container>
    )}
  </BoardsProvider>
);

function getLetter(title) {
  return (R.head([...title]) || '#').toUpperCase();
}

const Container = styled.div`
  .ant-dropdown {
    width: 300px;
  }
`;

const Item = styled.div`
  display: flex;
`;

const Color = styled(Avatar)`
  &.ant-avatar-circle {
    background-color: ${p => p.color || '#0079BF'};
    width: 28px;
    height: 28px;
  }

  .ant-avatar-string {
    display: flex;
    align-items: center;
    height: 28px;
  }
`;

const Title = styled.div`
  margin-bottom: 3px;
`;

const Right = styled.div`
  flex: 1;
  padding-left: 10px;
  padding-bottom: 5px;
`;

const Description = styled.div`
  font-size: 11px;
  line-height: 1.4;
  overflow-wrap: break-word;
  white-space: normal;
`;
