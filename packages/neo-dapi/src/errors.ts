import { ErrorResponse, getStandardError, StandardErrorCodes } from '@neongd/json-rpc';

export enum NeoDapiErrorCodes {
  UserRejected = -32001,
  UnsupportedNetwork = -32002,
  NoAccount = -32003,
  InsufficientFunds = -32004,
  RemoteRpcError = -32005,
}

const ERROR_MESSAGE_MAP = {
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
  if (isNeoDapiErrorCode(code)) {
    return {
      code,
      message: ERROR_MESSAGE_MAP[code],
    };
  }
  return getStandardError(StandardErrorCodes.InternalError);
}
