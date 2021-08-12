import { ErrorCodes, getError, isValidErrorCode } from './errors';
import {
  ErrorResponse,
  JsonRpcError,
  JsonRpcNotification,
  JsonRpcRequest,
  JsonRpcResult,
} from './types';

let lastPayloadId = 0;

export function payloadId(): number {
  return ++lastPayloadId;
}

export function formatJsonRpcRequest<T = any>(
  method: string,
  params?: T,
  id?: number,
): JsonRpcRequest<T> {
  return {
    id: id != null ? id : payloadId(),
    jsonrpc: '2.0',
    method,
    params,
  };
}

export function formatJsonRpcNotification<T = any>(
  method: string,
  params?: T,
): JsonRpcNotification<T> {
  return {
    jsonrpc: '2.0',
    method,
    params,
  };
}

export function formatJsonRpcResult<T = any>(id: number, result: T): JsonRpcResult<T> {
  return {
    id,
    jsonrpc: '2.0',
    result,
  };
}

export function formatJsonRpcError(id: number, error?: string | ErrorResponse): JsonRpcError {
  return {
    id,
    jsonrpc: '2.0',
    error: formatErrorResponse(error),
  };
}

export function formatErrorResponse(error?: string | ErrorResponse): ErrorResponse {
  if (error == null) {
    return getError(ErrorCodes.InternalError);
  }
  if (typeof error === 'string') {
    return {
      ...getError(ErrorCodes.InternalError),
      message: error,
    };
  }
  if (!isValidErrorCode(error.code)) {
    return {
      ...error,
      code: ErrorCodes.InternalError,
    };
  }
  return error;
}
