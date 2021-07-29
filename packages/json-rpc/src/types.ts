export interface IEvents {
  on(event: string, listener: any): void;
  once(event: string, listener: any): void;
  removeListener(event: string, listener: any): void;
}

export interface RequestArguments<T = any> {
  method: string;
  params?: T;
}

export interface JsonRpcRequest<T = any> extends RequestArguments<T> {
  id: number;
  jsonrpc: string;
}

export interface JsonRpcNotification<T = any> extends RequestArguments<T> {
  jsonrpc: string;
}

export interface JsonRpcResult<T = any> {
  id: number;
  jsonrpc: string;
  result: T;
}

export interface JsonRpcError {
  id: number;
  jsonrpc: string;
  error: ErrorResponse;
}

export interface ErrorResponse {
  code: number;
  message: string;
  data?: any;
}

export type JsonRpcResponse<T = any> = JsonRpcResult<T> | JsonRpcError;

export type JsonRpcPayload<RP = any, NP = any, R = any> =
  | JsonRpcRequest<RP>
  | JsonRpcNotification<NP>
  | JsonRpcResponse<R>;

export interface IJsonRpcConnection extends IEvents {
  connected: boolean;
  connecting: boolean;
  open(opts?: any): Promise<void>;
  close(): Promise<void>;
  send(payload: JsonRpcPayload, context?: any): Promise<void>;
}

export interface IJsonRpcProxy extends IEvents {
  connection: IJsonRpcConnection;
  connect(connection?: IJsonRpcConnection): Promise<void>;
  disconnect(): Promise<void>;

  request<Result = any, Params = any>(
    args: RequestArguments<Params>,
    context?: any,
  ): Promise<Result>;

  notify<Params = any>(args: RequestArguments<Params>, context?: any): Promise<void>;

  resolve<Result = any>(id: number, result: Result, context?: any): Promise<void>;

  reject(id: number, error: ErrorResponse, context?: any): Promise<void>;
}

export type PostMessage = (message: string) => void;

export type MessageListener = (message: string) => void;

export type Disposer = () => void;

export type AddMessageListener = (listener: MessageListener) => Disposer | void;

export interface Logger {
  log(tag: string, message: string): void;
}
