// @flow

import React, { useState } from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import * as R from 'ramda';
import { Modal, Input, Select, Icon } from 'antd';
import { CirclePicker } from 'react-color';
import styled, { createGlobalStyle } from 'styled-components';

import * as Messages from '../../domain/messages';

import { AddBoardMutation } from './AddBoardMutation';

type Props = {|
  visible: boolean,
  onToggle: () => void,
  history: RouterHistory
|};

const state = {
  title: '',
  description: '',
  priv: true,
  color: '#0079BF'
};

export const ModalComponent = (props: Props) => {
  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [priv, setPriv] = useState(state.priv);
  const [color, setColor] = useState(state.color);

  const flush = () => {
    setTitle(state.title);
    setDescription(state.description);
    setPriv(state.priv);
    setColor(state.color);
  };

  return (
    <AddBoardMutation>
      {(addBoard, loading) => (
        <Modal
          title="Create board"
          visible={props.visible}
          wrapClassName="add-board-modal"
          okText="Create"
          okButtonProps={{
            disabled: R.isEmpty(title) || R.isEmpty(description),
            loading
          }}
          onCancel={() => {
            props.onToggle();
            flush();
          }}
          onOk={() =>
            addBoard({ title, description, color, private: priv })
              .then(res => {
                props.onToggle();
                props.history.push(`/board/${res.id}`);
              })
              .catch(() => Messages.error())
          }
        >
          <Content>
            <GlobalModalStyle />
            <Left>
              <Input
                placeholder="Enter a board name..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={styles.input}
              />
              <Input.TextArea
                placeholder="Enter a description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={styles.input}
              />
              <Select
                value={String(priv)}
                onChange={value => setPriv(value === 'true')}
                style={styles.select}
              >
                <Select.Option value="true">
                  <Icon type="lock" />
                  <SelectText>Private</SelectText>
                </Select.Option>
                <Select.Option value="false">
                  <Icon type="team" />
                  <SelectText>Public</SelectText>
                </Select.Option>
              </Select>
            </Left>
            <Right>
              <CirclePicker
                width="126px"
                colors={colors}
                color={color}
                onChange={color => setColor(color.hex)}
              />
            </Right>
          </Content>
        </Modal>
      )}
    </AddBoardMutation>
  );
};

export const AddBoardModal = withRouter(ModalComponent);

const colors = [
  '#0079BF',
  '#d29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
  '#00aecc',
  '#838c91'
];

const GlobalModalStyle = createGlobalStyle`
 .add-board-modal .ant-modal-body {
    padding: 15px 15px 20px 15px;
  }
`;

const Content = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const Right = styled.div``;

const SelectText = styled.span`
  padding-left: 5px;
`;

const styles = {
  input: {
    marginBottom: 10
  },
  select: {
    width: 110
  }
};
