import { getError, INTERNAL_ERROR, isValidErrorCode } from './errors';
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
    error: formatErrorMessage(error),
  };
}

export function formatErrorMessage(error?: string | ErrorResponse): ErrorResponse {
  if (error == null) {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === 'string') {
    return {
      ...getError(INTERNAL_ERROR),
      message: error,
    };
  }
  if (!isValidErrorCode(error.code)) {
    return {
      ...getError(INTERNAL_ERROR),
      message: error.message,
    };
  }
  return error;
}
