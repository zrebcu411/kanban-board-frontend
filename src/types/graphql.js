/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export type SignUp_signup_result = {
  token: string
};

export type SignUp_signup = {
  result: ?SignUp_signup_result,
  errors: Array<SignUpError>
};

export type SignUp = {
  signup: SignUp_signup
};

export type SignUpVariables = {
  name: string,
  email: string,
  password: string
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// undefined
export type SignUpError = 'EMAIL_ALREADY_USED';

//==============================================================
// END Enums and Input Objects
//==============================================================
