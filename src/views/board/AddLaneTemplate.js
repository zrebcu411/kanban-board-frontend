// @flow

import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

import { AddLaneMutation } from './AddLaneMutation';

type Props = {||};

export const AddLaneTemplate = (props: Props) => {
  const [title, setTitle] = useState('');

  return (
    <Wrapper>
      <Input
        size="small"
        placeholder="Enter a title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={styles.input}
      />
      <div>
        <AddLaneMutation
          title={title}
          boardId={11}
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
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #e3e3e3;
  border-radius: 3px;
  margin: 5px 5px;
  min-width: 270px;
  padding: 10px;
`;

const styles = {
  spaceLeft: {
    marginLeft: 7
  },
  input: {
    fontSize: 13,
    marginBottom: 7
  }
};
