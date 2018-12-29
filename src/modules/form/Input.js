// @flow

import React from 'react';
import { Field, type FieldProps, getIn } from 'formik';
import { Input as InputComponent } from 'antd';

import { FormItem } from './components/FormItem';
// import { Input as InputComponent } from './components/Input';

type Props<V: Object> = {|
  field: $Keys<V>,
  label?: React$Node,
  placeholder?: string,
  type?: string,
  prefix?: React$Node
|};

export function Input<V: Object>(props: Props<V>) {
  return (
    <Field
      name={props.field}
      render={(fieldProps: FieldProps<V>) => {
        const { field, form } = fieldProps;
        const value = getIn(form.values, field.name);

        return (
          <FormItem
            label={props.label}
            hasLabel={!!props.label}
            touched={getIn(form.touched, field.name)}
            error={getIn(form.errors, field.name)}
          >
            <InputComponent
              {...field}
              placeholder={props.placeholder}
              type={props.type}
              prefix={props.prefix}
              value={value}
            />
          </FormItem>
        );
      }}
    />
  );
}
