// @flow

import { notification } from 'antd';

export function error() {
  notification.error({
    message: 'Coś poszło nie tak',
    description: 'Spróbuj ponownie później.'
  });
}
