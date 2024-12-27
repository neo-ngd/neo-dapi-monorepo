import { ErrorJson } from './types';

export enum StandardErrorCodes {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  CommunicationFailed = -32000,
}

const DEFAULT_ERROR_MESSAGE_MAP = {
  [StandardErrorCodes.ParseError]: 'Parse error',
  [StandardErrorCodes.InvalidRequest]: 'Invalid Request',
  [StandardErrorCodes.MethodNotFound]: 'Method not found',
  [StandardErrorCodes.InvalidParams]: 'Invalid params',
  [StandardErrorCodes.InternalError]: 'Internal error',
  [StandardErrorCodes.CommunicationFailed]: 'Communication failed',
};

export function isValidErrorCode(code: unknown): code is number {
  return typeof code === 'number';
}

export function isStandardErrorCode(code: number): code is StandardErrorCodes {
  return Object.values(StandardErrorCodes).includes(code);
}

export function getStandardErrorJson(
  code: StandardErrorCodes,
  message?: string,
  data?: unknown,
): ErrorJson {
  return {
    code,
    message: message ?? DEFAULT_ERROR_MESSAGE_MAP[code],
    data,
  };
}

export class JsonRpcError extends Error {
  code: number;
  data?: unknown;

  constructor(errorJson: ErrorJson) {
    super(errorJson.message);
    this.code = errorJson.code;
    this.data = errorJson.data;
  }
}
