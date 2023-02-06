import { ErrorResponse, getStandardErrorResponse, StandardErrorCodes } from '@neongd/json-rpc';

export enum DapiErrorCodes {
  UserRejected = -32001,
  UnsupportedNetwork = -32002,
  NoAccount = -32003,
  InsufficientFunds = -32004,
  RemoteRpcError = -32005,
}

const ERROR_MESSAGE_MAP = {
  [DapiErrorCodes.UserRejected]: 'User rejected',
  [DapiErrorCodes.UnsupportedNetwork]: 'Unsupported network',
  [DapiErrorCodes.NoAccount]: 'No account',
  [DapiErrorCodes.InsufficientFunds]: 'Insufficient funds',
  [DapiErrorCodes.RemoteRpcError]: 'Remote rpc error',
};

export function isDapiErrorCode(code: number): code is DapiErrorCodes {
  return Object.values(DapiErrorCodes).includes(code);
}

export function getDapiErrorResponse(code: number): ErrorResponse {
  if (isDapiErrorCode(code)) {
    return {
      code,
      message: ERROR_MESSAGE_MAP[code],
    };
  }
  return getStandardErrorResponse(StandardErrorCodes.InternalError);
}
