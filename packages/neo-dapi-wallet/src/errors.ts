import { ErrorResponse, getError as getStandardError } from '@neongd/json-rpc';

export enum DapiWalletErrorCodes {
  UnsupportedNetwork = 100,
}

const ERROR_MESSAGE_MAP = {
  [DapiWalletErrorCodes.UnsupportedNetwork]: 'Unsupported network.',
};

export function getDapiError(code: number): ErrorResponse {
  if (code in DapiWalletErrorCodes) {
    return {
      code,
      message: ERROR_MESSAGE_MAP[code as DapiWalletErrorCodes],
    };
  }
  return getStandardError(code);
}
