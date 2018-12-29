// @flow

import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

import { AddCardMutation } from './AddCardMutation';

type Props = {||};

export const AddCardTemplate = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Wrapper>
      <Input
        size="small"
        placeholder="Enter a title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={styles.input}
      />
      <Input.TextArea
        size="small"
        placeholder="Enter a description..."
        onChange={e => setDescription(e.target.value)}
        style={styles.textarea}
      />
      <AddCardMutation
        title={title}
        description={description}
        boardId={11}
        // $FlowFixMe
        laneId={+props.laneId}
        // $FlowFixMe
        onAdd={props.onAdd}
      />
      <Button
        size="small"
        // $FlowFixMe
        onClick={() => props.onCancel()}
        style={styles.spaceLeft}
      >
        Cancel
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  padding: 10px;
  max-width: 250px;
  margin-bottom: 7px;
  min-width: 230px;
`;

const styles = {
  spaceLeft: {
    marginLeft: 7
  },
  textarea: {
    padding: '1px 7px',
    marginBottom: 10,
    fontSize: 13
  },
  input: {
    fontSize: 13,
    marginBottom: 7
  }
};
