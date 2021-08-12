import { ErrorResponse } from './types';

export enum ErrorCodes {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  ServerError = -32000,
}

const STANDARD_ERROR_MAP = {
  [ErrorCodes.ParseError]: {
    code: ErrorCodes.ParseError,
    message: 'Parse error',
  },
  [ErrorCodes.InvalidRequest]: {
    code: ErrorCodes.InvalidRequest,
    message: 'Invalid Request',
  },
  [ErrorCodes.MethodNotFound]: {
    code: ErrorCodes.MethodNotFound,
    message: 'Method not found',
  },
  [ErrorCodes.InvalidParams]: {
    code: ErrorCodes.InvalidParams,
    message: 'Invalid params',
  },
  [ErrorCodes.InternalError]: {
    code: ErrorCodes.InternalError,
    message: 'Internal error',
  },
  [ErrorCodes.ServerError]: {
    code: ErrorCodes.ServerError,
    message: 'Server error',
  },
};

export function isValidErrorCode(code: number): boolean {
  return typeof code === 'number';
}

export function getError(code: number): ErrorResponse {
  if (!Object.keys(ErrorCodes).includes(String(code))) {
    return STANDARD_ERROR_MAP[ErrorCodes.InternalError];
  }
  return (STANDARD_ERROR_MAP as any)[code];
}
