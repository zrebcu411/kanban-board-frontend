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
import { SignInMutation } from './SignInMutation';

import type { Values } from './types';

type Props = {|
  history: RouterHistory
|};

export const SignIn = (props: Props) => (
  <AuthContextConsumer>
    {context => (
      <SignInMutation>
        {(signin, { loading, data }) => (
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={(values: Values, actions: FormikActions<Values>) => {
              signin(values)
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
                  <Title>Sign in to Kanban Board</Title>
                  <FormikForm noValidate autoComplete="off">
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
                        Sign in
                      </Button>
                    </ButtonRow>
                    <div>
                      Don't have an account? <Link to="/signup">Sign up.</Link>
                    </div>
                  </FormikForm>
                </FormWrapper>
              </Wrapper>
            )}
          />
        )}
      </SignInMutation>
    )}
  </AuthContextConsumer>
);

const INITIAL_VALUES = {
  email: '',
  password: ''
};

const VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email('E-mail jest niepoprawny')
    .required('E-mail jest wymagany'),
  password: yup.string().required('Hasło jest wymagane')
});

type Keys = $Keys<Values>;

const ERROR_MAPPING: { [string]: [Keys, string] } = {
  password_invalid: ['password', 'Podane hasło jest niepoprawne'],
  user_does_not_exist: ['email', 'Podane konto nie istnieje']
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
