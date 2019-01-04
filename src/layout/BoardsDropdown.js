// @flow

import React from 'react';
import { Dropdown, Menu, Spin } from 'antd';

import { If } from '../components';
import { BoardsProvider } from '../providers';
import { Square, Icon, IconTitle } from './Layout';

type Props = {| onAddBoardClick: () => void |};

export const BoardsDropdown = (props: Props) => (
  <BoardsProvider>
    {({ boards, loading }) => (
      <Dropdown
        trigger={['click']}
        getPopupContainer={node => node.parentNode}
        overlay={
          <Menu>
            <If cond={loading}>
              <Menu.Item key="loading">
                <Spin />
              </Menu.Item>
            </If>

            {boards.map(board => (
              <Menu.Item key={board.id}>{board.title}</Menu.Item>
            ))}

            <Menu.Item onClick={() => props.onAddBoardClick()}>
              Create board
            </Menu.Item>
          </Menu>
        }
      >
        <Square>
          <Icon type="project" />
          <IconTitle>Boards</IconTitle>
        </Square>
      </Dropdown>
    )}
  </BoardsProvider>
);
