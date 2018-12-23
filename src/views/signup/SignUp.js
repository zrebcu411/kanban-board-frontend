// @flow

import React from 'react';
import {
  Formik,
  Form as FormikForm,
  type FormikProps,
  type FormikActions
} from 'formik';
import { Button } from 'antd';
import * as yup from 'yup';

import * as Errors from '../../domain/errors';
import * as Notifications from '../../domain/notifications.js';
import * as Form from '../../modules/form';

import { SignUpMutation } from './SignUpMutation';

import type { Values } from './types';

type Props = {||};

export const SignUp = (props: Props) => (
  <SignUpMutation>
    {(signup, { loading, data }) => (
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={(values: Values, actions: FormikActions<Values>) => {
          signup(values)
            .then(({ errors, result }) => {
              if (result) {
                console.log(result.token);
              } else {
                const [fields, message] = decodeErrorMessage(errors);
                // $FlowFixMe
                actions.setFieldError(fields, message);
              }
            })
            .catch(err => Notifications.error());
        }}
        render={(formik: FormikProps<Values>) => (
          <FormikForm noValidate autoComplete="off">
            <Form.Input field="name" placeholder="Imię i nazwisko" />
            <Form.Input field="email" type="email" placeholder="E-mail" />
            <Form.Input field="password" type="password" placeholder="Hasło" />
            <Button
              type="primary"
              htmlType="submit"
              disabled={!formik.isValid}
              loading={loading}
            >
              Zarejestruj
            </Button>
          </FormikForm>
        )}
      />
    )}
  </SignUpMutation>
);

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: ''
};

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required('Imię i nazwisko jest wymagane'),
  email: yup
    .string()
    .email('E-mail jest niepoprawny')
    .required('E-mail jest wymagany'),
  password: yup.string().required('Hasło jest wymagane')
});

type Keys = $Keys<Values>;

const ERROR_MAPPING: { [string]: [Keys, string] } = {
  email_already_used: ['email', 'Podany adres e-mail jest już zajęty']
};

const decodeErrorMessage = Errors.createErrorDecoder(ERROR_MAPPING, 'password');
