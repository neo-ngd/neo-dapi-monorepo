import { ErrorResponse } from './types';

export class RpcError extends Error implements ErrorResponse {
  code: number;
  data?: any;

  constructor(error: ErrorResponse) {
    super(error.message);
    this.code = error.code;
    this.data = error.data;
  }
}

export enum StandardErrorCodes {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  NetworkError = -32000,
}

const ERROR_MESSAGE_MAP = {
  [StandardErrorCodes.ParseError]: 'Parse error',
  [StandardErrorCodes.InvalidRequest]: 'Invalid Request',
  [StandardErrorCodes.MethodNotFound]: 'Method not found',
  [StandardErrorCodes.InvalidParams]: 'Invalid params',
  [StandardErrorCodes.InternalError]: 'Internal error',
  [StandardErrorCodes.NetworkError]: 'Network error',
};

export function isValidErrorCode(code: unknown): code is number {
  return typeof code === 'number';
}

export function isStandardErrorCode(code: number): code is StandardErrorCodes {
  return Object.values(StandardErrorCodes).includes(code);
}

export function getStandardError(code: number): ErrorResponse {
  const finalCode = isStandardErrorCode(code) ? code : StandardErrorCodes.InternalError;
  return {
    code: finalCode,
    message: ERROR_MESSAGE_MAP[finalCode],
  };
}
