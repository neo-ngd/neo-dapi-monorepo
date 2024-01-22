import { getStandardErrorJson, isValidErrorCode, StandardErrorCodes } from './errors';
import {
  ErrorJson,
  ErrorResponse,
  Json,
  Notification,
  Params,
  Request,
  ResultResponse,
} from './types';

let lastPayloadId = 0;

export function payloadId(): number {
  return ++lastPayloadId;
}

export function formatRequest<P extends Params = Params>(
  method: string,
  params: P,
  id?: number,
): Request<P> {
  return {
    id: id ?? payloadId(),
    jsonrpc: '2.0',
    method,
    params,
  };
}

export function formatNotification<P extends Params = Params>(
  method: string,
  params: P,
): Notification<P> {
  return {
    jsonrpc: '2.0',
    method,
    params,
  };
}

export function formatResultResponse<R extends Json = Json>(
  id: number,
  result: R,
): ResultResponse<R> {
  return {
    id,
    jsonrpc: '2.0',
    result,
  };
}

export function formatErrorResponse(id: number, error: ErrorJson): ErrorResponse {
  return {
    id,
    jsonrpc: '2.0',
    error,
  };
}

export function formatErrorJson(error: unknown): ErrorJson {
  let code: number = StandardErrorCodes.InternalError;
  let message: string = getStandardErrorJson(StandardErrorCodes.InternalError).message;
  let data: Json | undefined;

  if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Object) {
    code = 'code' in error && isValidErrorCode(error.code) ? error.code : code;
    message = 'message' in error && typeof error.message === 'string' ? error.message : message;
    data = 'data' in error ? (error.data as Json) : data;
  }
  return { code, message, data };
}
