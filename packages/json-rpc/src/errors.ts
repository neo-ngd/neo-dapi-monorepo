import { ErrorResponse } from './types';

export const PARSE_ERROR = 'PARSE_ERROR';
export const INVALID_REQUEST = 'INVALID_REQUEST';
export const METHOD_NOT_FOUND = 'METHOD_NOT_FOUND';
export const INVALID_PARAMS = 'INVALID_PARAMS';
export const INTERNAL_ERROR = 'INTERNAL_ERROR';
export const SERVER_ERROR = 'SERVER_ERROR';

const STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: 'Parse error' },
  [INVALID_REQUEST]: { code: -32600, message: 'Invalid Request' },
  [METHOD_NOT_FOUND]: { code: -32601, message: 'Method not found' },
  [INVALID_PARAMS]: { code: -32602, message: 'Invalid params' },
  [INTERNAL_ERROR]: { code: -32603, message: 'Internal error' },
  [SERVER_ERROR]: { code: -32000, message: 'Server error' },
};

export function isValidErrorCode(code: number): boolean {
  return typeof code === 'number';
}

export function getError(type: string): ErrorResponse {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[INTERNAL_ERROR];
  }
  return (STANDARD_ERROR_MAP as any)[type];
}
