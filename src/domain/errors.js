// @flow

import * as R from 'ramda';

export const DEFAULT_ERROR = 'Coś poszło nie tak. Spóbuj ponownie później.';

export function createErrorDecoder<T: string>(
  errorMapping: { [string]: [T, string] },
  defaultField: T,
  defaultError: string = DEFAULT_ERROR
) {
  return function<K: string>(errors: Array<K>): [T, string] {
    const defaultResult = [defaultField, defaultError];
    const error = R.head(errors);

    return error
      ? errorMapping[error.toLowerCase()] || defaultResult
      : defaultResult;
  };
}
