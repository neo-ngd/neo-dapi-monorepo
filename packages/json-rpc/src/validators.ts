import {
  JsonRpcError,
  JsonRpcNotification,
  JsonRpcPayload,
  JsonRpcRequest,
  JsonRpcResponse,
  JsonRpcResult,
} from './types';

export function isJsonRpcPayload(payload: any): payload is JsonRpcPayload {
  return 'jsonrpc' in payload && payload.jsonrpc === '2.0';
}

export function isJsonRpcRequest<T = any>(payload: JsonRpcPayload): payload is JsonRpcRequest<T> {
  return isJsonRpcPayload(payload) && 'id' in payload && 'method' in payload;
}

export function isJsonRpcNotification<T = any>(
  payload: JsonRpcPayload,
): payload is JsonRpcNotification<T> {
  return isJsonRpcPayload(payload) && !('id' in payload) && 'method' in payload;
}

export function isJsonRpcResponse<T = any>(payload: JsonRpcPayload): payload is JsonRpcResponse<T> {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}

export function isJsonRpcResult<T = any>(payload: JsonRpcPayload): payload is JsonRpcResult<T> {
  return 'result' in payload;
}

export function isJsonRpcError(payload: JsonRpcPayload): payload is JsonRpcError {
  return 'error' in payload;
}
