// @flow
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import { If } from '../../../components';

type Props = {|
  label?: React$Node,
  error?: null | string,
  touched: boolean,
  hasLabel: boolean,
  children: React$Node
|};

export const FormItem = (props: Props) => {
  const { error, touched } = props;
  const hasError = touched && error;

  return (
    <Styled {...props}>
      <div className={classnames({ 'has-error': hasError })}>
        <If cond={props.hasLabel}>
          <Label
            className="form-item-label"
            hasContent={props.label !== undefined}
          >
            {props.label}
          </Label>
        </If>

        <div>{props.children}</div>
        <span className={classnames('error-box', { 'has-error': hasError })}>
          <If cond={hasError}>{error || ''}</If>
        </span>
      </div>
    </Styled>
  );
};

FormItem.defaultProps = {
  hasLabel: true
};

const Styled = styled.div`
  display: block;
  min-height: ${p => (p.label ? '90px' : '64px')};
  position: relative;

  .error-box {
    color: #f5222d;
    opacity: 0;
    top: -10px;
    position: relative;
    transition: all 0.2s ease;
  }

  .has-error {
    opacity: 1;
    top: 2px;
    transition: all 0.2s ease;
  }
`;

const Label = styled.label`
  height: ${p => (p.hasContent ? 'auto' : '1rem')};
  margin-bottom: 8px;
  display: inline-block;
`;
