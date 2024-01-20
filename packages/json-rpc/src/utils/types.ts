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

export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | {
      [prop: string]: Json;
    };

export type Params = Json[] | Record<string, Json> | undefined;

export type RequestArguments<P extends Params = Params> = undefined extends P
  ? { method: string; params?: P }
  : { method: string; params: P };

export type Request<P extends Params = Params> = RequestArguments<P> & {
  id: number;
  jsonrpc: string;
};

export type ResultResponse<R extends Json = Json> = {
  id: number;
  jsonrpc: string;
  result: R;
};

export type ErrorJson = {
  code: number;
  message: string;
  data?: Json;
};

export type ErrorResponse = {
  id: number;
  jsonrpc: string;
  error: ErrorJson;
};

export type Response<R extends Json = Json> = ResultResponse<R> | ErrorResponse;

export type Notification<T extends Params = Params> = RequestArguments<T> & {
  jsonrpc: string;
};

export type Payload<
  RP extends Params = Params,
  NP extends Params = Params,
  R extends Json = Json,
> = Request<RP> | Response<R> | Notification<NP>;

export interface Logger {
  info(message: string): void;
  error(message: string, error: unknown): void;
}
