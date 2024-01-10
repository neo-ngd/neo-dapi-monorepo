import EventEmitter from 'eventemitter3';

export interface EventDispatcher<Events extends EventEmitter.ValidEventTypes> {
  on<T extends EventEmitter.EventNames<Events>>(
    event: T,
    fn: EventEmitter.EventListener<Events, T>,
  ): void;

  removeListener<T extends EventEmitter.EventNames<Events>>(
    event: T,
    fn: EventEmitter.EventListener<Events, T>,
  ): void;
}

export interface Logger {
  info(message: string): void;
  error(message: string, error: unknown): void;
}

export interface RequestArguments<T = unknown> {
  method: string;
  params?: T;
}

export interface Request<T = unknown> extends RequestArguments<T> {
  id: number;
  jsonrpc: string;
}

export interface Result<T = unknown> {
  id: number;
  jsonrpc: string;
  result: T;
}

export interface ErrorResponse {
  code: number;
  message: string;
  data?: unknown;
}

export interface JsonRpcError {
  id: number;
  jsonrpc: string;
  error: ErrorResponse;
}

export type Response<T = unknown> = Result<T> | JsonRpcError;

export interface Notification<T = unknown> extends RequestArguments<T> {
  jsonrpc: string;
}

export type Payload<RP = unknown, NP = unknown, R = unknown> =
  | Request<RP>
  | Response<R>
  | Notification<NP>;
