// @flow

import React from 'react';
import { Link, type RouterHistory } from 'react-router-dom';
import {
  Formik,
  Form as FormikForm,
  type FormikProps,
  type FormikActions
} from 'formik';
import { Button, Icon } from 'antd';
import * as yup from 'yup';
import styled from 'styled-components';

import * as Errors from '../../domain/errors';
import * as Notifications from '../../domain/notifications.js';
import * as Form from '../../modules/form';

import { AuthContextConsumer } from '../../context/AuthContext';
import { SignUpMutation } from './SignUpMutation';

import type { Values } from './types';

type Props = {|
  history: RouterHistory
|};

export const SignUp = (props: Props) => (
  <AuthContextConsumer>
    {context => (
      <SignUpMutation>
        {(signup, { loading, data }) => (
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={(values: Values, actions: FormikActions<Values>) => {
              signup(values)
                .then(({ errors, result }) => {
                  if (result) {
                    context.setAuth(result.token);
                    props.history.push('/');
                  } else {
                    const [fields, message] = decodeErrorMessage(errors);
                    // $FlowFixMe
                    actions.setFieldError(fields, message);
                  }
                })
                .catch(err => Notifications.error());
            }}
            render={(formik: FormikProps<Values>) => (
              <Wrapper>
                <FormWrapper>
                  <Title>Create an account</Title>
                  <FormikForm noValidate autoComplete="off">
                    <Form.Input
                      field="name"
                      placeholder="Imię i nazwisko"
                      prefix={<Icon type="user" style={styles.inputIcon} />}
                    />
                    <Form.Input
                      field="email"
                      type="email"
                      placeholder="E-mail"
                      prefix={<Icon type="mail" style={styles.inputIcon} />}
                    />
                    <Form.Input
                      field="password"
                      type="password"
                      placeholder="Hasło"
                      prefix={<Icon type="lock" style={styles.inputIcon} />}
                    />
                    <ButtonRow>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!formik.isValid}
                        loading={loading}
                        block
                      >
                        Sign up
                      </Button>
                    </ButtonRow>
                    <div>
                      Do you have an account? <Link to="/signin">Sign in.</Link>
                    </div>
                  </FormikForm>
                </FormWrapper>
              </Wrapper>
            )}
          />
        )}
      </SignUpMutation>
    )}
  </AuthContextConsumer>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  padding-bottom: 15px;
`;

const FormWrapper = styled.div`
  width: 330px;
`;

const ButtonRow = styled.div`
  padding: 15px 0;
`;

const styles = {
  inputIcon: { color: 'rgba(0, 0, 0, 0.25)' }
};
