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
  [ErrorCodes.ParseError]: { code: -32700, message: 'Parse error' },
  [ErrorCodes.InvalidRequest]: { code: -32600, message: 'Invalid Request' },
  [ErrorCodes.MethodNotFound]: { code: -32601, message: 'Method not found' },
  [ErrorCodes.InvalidParams]: { code: -32602, message: 'Invalid params' },
  [ErrorCodes.InternalError]: { code: -32603, message: 'Internal error' },
  [ErrorCodes.ServerError]: { code: -32000, message: 'Server error' },
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
