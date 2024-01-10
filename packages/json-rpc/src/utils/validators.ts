import { JsonRpcError, Notification, Payload, Request, Response, Result } from './types';

export function isJsonRpcPayload(payload: unknown): payload is Payload {
  return payload instanceof Object && 'jsonrpc' in payload && payload.jsonrpc === '2.0';
}

export function isJsonRpcRequest<T = unknown>(payload: Payload): payload is Request<T> {
  return 'id' in payload && 'method' in payload;
}

export function isJsonRpcResult<T = unknown>(payload: Payload): payload is Result<T> {
  return 'result' in payload;
}

export function isJsonRpcError(payload: Payload): payload is JsonRpcError {
  return 'error' in payload;
}

export function isJsonRpcResponse<T = unknown>(payload: Payload): payload is Response<T> {
  return isJsonRpcResult(payload) || isJsonRpcError(payload);
}

export function isJsonRpcNotification<T = unknown>(payload: Payload): payload is Notification<T> {
  return !('id' in payload) && 'method' in payload;
}
