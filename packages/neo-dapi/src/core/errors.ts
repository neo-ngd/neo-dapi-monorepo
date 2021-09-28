import { ErrorResponse } from '@neongd/json-rpc';

export enum NeoDapiErrorCodes {
  InternalError = 100,
  UnsupportedNetwork = 101,
  NoAccount = 102,
  IncorrectNetwork = 103,
  MalformedInput = 104,
  InsufficientFunds = 105,
  RemoteRpcError = 106,
  UserRejected = 107,
}

const ERROR_MESSAGE_MAP = {
  [NeoDapiErrorCodes.InternalError]: 'Internal error',
  [NeoDapiErrorCodes.UnsupportedNetwork]: 'Unsupported network',
  [NeoDapiErrorCodes.NoAccount]: 'NoAccount',
  [NeoDapiErrorCodes.IncorrectNetwork]: 'Incorrect Network',
  [NeoDapiErrorCodes.MalformedInput]: 'Malformed Input',
  [NeoDapiErrorCodes.InsufficientFunds]: 'Insufficient Funds',
  [NeoDapiErrorCodes.RemoteRpcError]: 'Remote Rpc Error',
  [NeoDapiErrorCodes.UserRejected]: 'User Rejected',
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
