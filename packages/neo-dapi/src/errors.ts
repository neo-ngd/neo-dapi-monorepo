import { ErrorResponse, StandardErrorCodes } from '@neongd/json-rpc';

export enum NeoDapiErrorCodes {
  UserRejected = -32001,
  UnsupportedNetwork = -32002,
  NoAccount = -32003,
  InsufficientFunds = -32004,
  RemoteRpcError = -32005,
}

const ERROR_MESSAGE_MAP = {
  [StandardErrorCodes.InternalError]: 'Internal error',
  [NeoDapiErrorCodes.UserRejected]: 'User rejected',
  [NeoDapiErrorCodes.UnsupportedNetwork]: 'Unsupported network',
  [NeoDapiErrorCodes.NoAccount]: 'No account',
  [NeoDapiErrorCodes.InsufficientFunds]: 'Insufficient funds',
  [NeoDapiErrorCodes.RemoteRpcError]: 'Remote rpc error',
};

export function isNeoDapiErrorCode(code: number): code is NeoDapiErrorCodes {
  return Object.values(NeoDapiErrorCodes).includes(code);
}

export function getNeoDapiError(code: number): ErrorResponse {
  const finalCode = isNeoDapiErrorCode(code) ? code : StandardErrorCodes.InternalError;
  return {
    code: finalCode,
    message: ERROR_MESSAGE_MAP[finalCode],
  };
}
