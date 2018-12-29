

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddLane
// ====================================================

export type AddLane_createLane = {
  id: string,
  title: string,
};

export type AddLane = {
  createLane: AddLane_createLane
};

export type AddLaneVariables = {
  boardId: number,
  title: string,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCard
// ====================================================

export type AddCard_createCard = {
  id: string,
  title: string,
};

export type AddCard = {
  createCard: AddCard_createCard
};

export type AddCardVariables = {
  boardId: number,
  laneId: number,
  title: string,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Board
// ====================================================

export type Board_board_lanes_cards = {
  id: string,
  title: string,
};

export type Board_board_lanes = {
  id: string,
  title: string,
  cards: Array<Board_board_lanes_cards>,
};

export type Board_board = {
  id: string,
  title: string,
  color: string,
  private: boolean,
  lanes: Array<Board_board_lanes>,
};

export type Board = {
  board: Board_board
};

export type BoardVariables = {
  id: number
};


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