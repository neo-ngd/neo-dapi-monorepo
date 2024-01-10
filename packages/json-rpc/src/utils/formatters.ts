import {
  getStandardErrorResponse,
  isStandardErrorCode,
  isValidErrorCode,
  StandardErrorCodes,
} from './errors';
import { ErrorResponse, JsonRpcError, Notification, Request, Result } from './types';

let lastPayloadId = 0;

export function payloadId(): number {
  return ++lastPayloadId;
}

export function formatJsonRpcRequest<T = unknown>(
  method: string,
  params?: T,
  id?: number,
): Request<T> {
  return {
    id: id ?? payloadId(),
    jsonrpc: '2.0',
    method,
    params,
  };
}

export function formatJsonRpcNotification<T = unknown>(
  method: string,
  params?: T,
): Notification<T> {
  return {
    jsonrpc: '2.0',
    method,
    params,
  };
}

export function formatJsonRpcResult<T = unknown>(id: number, result: T): Result<T> {
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
    error,
  };
}

export function formatErrorResponse(error: string | Error | ErrorResponse): ErrorResponse {
  let code: number = StandardErrorCodes.InternalError;
  let message: string = getStandardErrorResponse(StandardErrorCodes.InternalError).message;
  let data: unknown;

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
    message =
      error.message ?? isStandardErrorCode(code) ? getStandardErrorResponse(code).message : message;
    data = error.data;
  }
  return { code, message, data };
}
