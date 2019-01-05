// @flow

import React from 'react';
import LoaderComponent from 'react-loaders';
import styled from 'styled-components';

import 'loaders.css/loaders.css';

type Props = {|
  center?: boolean
|};

export const Loader = (props: Props) => {
  const loader = (
    <LoaderComponent type="ball-pulse" color="rgba(0, 0, 0, 0.15)" active />
  );

  if (props.center) {
    return <Container>{loader}</Container>;
  }
  return loader;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
