import { getStandardError, isValidErrorCode, StandardErrorCodes } from './errors';
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
    id: id ?? payloadId(),
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

export function formatJsonRpcError(id: number, error: ErrorResponse): JsonRpcError {
  return {
    id,
    jsonrpc: '2.0',
    error: formatErrorResponse(error),
  };
}

export function formatErrorResponse(error: string | Error | ErrorResponse): ErrorResponse {
  let code: number = StandardErrorCodes.InternalError;
  let message: string = getStandardError(code).message;
  let data: any;

  if (error == null) {
    // noop
  } else if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    code = isValidErrorCode((error as any).code) ? (error as any).code : code;
    message = error.message;
    data = (error as any).data;
  } else {
    code = isValidErrorCode(error.code) ? error.code : code;
    message = error.message ?? getStandardError(code).message;
    data = error.data;
  }
  return { code, message, data };
}
