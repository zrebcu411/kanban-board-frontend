// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './core/Application';

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(<Application />, root);
}
