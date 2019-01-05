// @flow

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

type Props = {|
  title: string,
  createdAt: string,
  description: string
|};

export const Card = (props: Props) => (
  <Container>
    <Header>
      <Title>{props.title}</Title>
      <Label>{moment.utc(props.createdAt).fromNow()}</Label>
    </Header>
    <Description>{props.description}</Description>
  </Container>
);

const Container = styled.div`
  padding: 10px;
`;

const Header = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
  color: #000;
  margin-bottom: 10px;
  display: flex;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  flex: 1;
`;

const Label = styled.div`
  width: 35%;
  text-align: right;
  padding-right: 10px;
  font-size: 10px;
`;

const Description = styled.div`
  font-size: 12px;
  color: #4d4d4d;
  white-space: normal;
`;
