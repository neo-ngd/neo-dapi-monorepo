import {
  ErrorResponse,
  Json,
  Notification,
  Params,
  Payload,
  Request,
  Response,
  ResultResponse,
} from './types';

export function isPayload(payload: unknown): payload is Payload {
  return payload instanceof Object && 'jsonrpc' in payload && payload.jsonrpc === '2.0';
}

export function isRequest<P extends Params = Params>(payload: Payload): payload is Request<P> {
  return 'id' in payload && 'method' in payload;
}

export function isResultResponse<R extends Json = Json>(
  payload: Payload,
): payload is ResultResponse<R> {
  return 'result' in payload;
}

export function isErrorResponse(payload: Payload): payload is ErrorResponse {
  return 'error' in payload;
}

export function isResponse<R extends Json = Json>(payload: Payload): payload is Response<R> {
  return isResultResponse(payload) || isErrorResponse(payload);
}

export function isNotification<P extends Params = Params>(
  payload: Payload,
): payload is Notification<P> {
  return !('id' in payload) && 'method' in payload;
}

export function isHttpUrl(url: string): boolean {
  return /^https?:/.test(url);
}

export function isWebSocketUrl(url: string): boolean {
  return /^wss?:/.test(url);
}
