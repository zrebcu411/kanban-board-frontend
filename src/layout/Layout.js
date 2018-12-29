// @flow

import React from 'react';
import styled from 'styled-components';
import { Avatar as AntAvatar, Dropdown, Menu } from 'antd';

import { AuthContextConsumer } from '../context/AuthContext';

type Props = {|
  children: React$Node
|};

export const Layout = (props: Props) => (
  <AuthContextConsumer>
    {context => (
      <Wrapper>
        <Bar>
          <Dropdown
            trigger={['click']}
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
        </Bar>
        <Content>{props.children}</Content>
      </Wrapper>
    )}
  </AuthContextConsumer>
);

const Wrapper = styled.div``;

const Content = styled.div`
  height: calc(100vh - 45px);
  overflow: hidden;
`;

const Bar = styled.div`
  padding: 0 10px;
  height: 45px;
  background-color: #026aa7;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Avatar = styled(AntAvatar)`
  cursor: pointer;
`;
