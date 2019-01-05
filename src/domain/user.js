// @flow

import * as R from 'ramda';

export function getInitials(name: string) {
  return name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map(p => R.head([...p]))
    .join('')
    .toUpperCase();
}
