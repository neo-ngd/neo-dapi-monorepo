import { ErrorResponse } from './types';

export enum ErrorCodes {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  ServerError = -32000,
}

export const SERVER_ERROR_CODE_RANGE = [-32099, -32000];

const ERROR_MESSAGE_MAP = {
  [ErrorCodes.ParseError]: 'Parse error',
  [ErrorCodes.InvalidRequest]: 'Invalid Request',
  [ErrorCodes.MethodNotFound]: 'Method not found',
  [ErrorCodes.InvalidParams]: 'Invalid params',
  [ErrorCodes.InternalError]: 'Internal error',
  [ErrorCodes.ServerError]: 'Server error',
};

export function isValidErrorCode(code: number): boolean {
  return typeof code === 'number';
}

export function isServerErrorCode(code: number): boolean {
  return code >= SERVER_ERROR_CODE_RANGE[0] && code <= SERVER_ERROR_CODE_RANGE[1];
}

export function getError(code: number): ErrorResponse {
  const finalCode = code in ErrorCodes ? (code as ErrorCodes) : ErrorCodes.InternalError;
  return {
    code: finalCode,
    message: ERROR_MESSAGE_MAP[finalCode],
  };
}
