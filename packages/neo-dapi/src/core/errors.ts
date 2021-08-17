import { ErrorResponse, getError as getStandardError } from '@neongd/json-rpc';

export enum ErrorCodes {
  UnsupportedNetwork = 100,
}

const ERROR_MESSAGE_MAP = {
  [ErrorCodes.UnsupportedNetwork]: 'Unsupported network.',
};

export function getError(code: number): ErrorResponse {
  if (code in ErrorCodes) {
    return {
      code,
      message: ERROR_MESSAGE_MAP[code as ErrorCodes],
    };
  }
  return getStandardError(code);
}
