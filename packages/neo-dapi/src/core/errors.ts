import { ErrorResponse } from '@neongd/json-rpc';

export enum NeoDapiErrorCodes {
  InternalError = 100,
  UnsupportedNetwork = 101,
}

const ERROR_MESSAGE_MAP = {
  [NeoDapiErrorCodes.InternalError]: 'Internal error',
  [NeoDapiErrorCodes.UnsupportedNetwork]: 'Unsupported network',
};

export function isNeoDapiErrorCode(code: number): code is NeoDapiErrorCodes {
  return Object.values(NeoDapiErrorCodes).includes(code);
}

export function getNeoDapiError(code: number): ErrorResponse {
  const finalCode = isNeoDapiErrorCode(code) ? code : NeoDapiErrorCodes.InternalError;
  return {
    code: finalCode,
    message: ERROR_MESSAGE_MAP[finalCode],
  };
}
