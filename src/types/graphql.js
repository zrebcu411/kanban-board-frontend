

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export type SignIn_signin_result = {
  token: string
};

export type SignIn_signin = {
  result: ?SignIn_signin_result,
  errors: Array<SignInError>,
};

export type SignIn = {
  signin: SignIn_signin
};

export type SignInVariables = {
  email: string,
  password: string,
};


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
  errors: Array<SignUpError>,
};

export type SignUp = {
  signup: SignUp_signup
};

export type SignUpVariables = {
  name: string,
  email: string,
  password: string,
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// undefined
export type SignInError = "PASSWORD_INVALID" | "USER_DOES_NOT_EXIST";

// undefined
export type SignUpError = "EMAIL_ALREADY_USED";

//==============================================================
// END Enums and Input Objects
//==============================================================