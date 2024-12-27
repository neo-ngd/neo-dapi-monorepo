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

export type Params = unknown[] | Record<string, unknown> | undefined;

export type RequestArguments<P extends Params = Params> = undefined extends P
  ? { method: string; params?: P }
  : { method: string; params: P };

export type Request<P extends Params = Params> = RequestArguments<P> & {
  id: number;
  jsonrpc: string;
};

export type Notification<P extends Params = Params> = RequestArguments<P> & {
  jsonrpc: string;
};

export type ResultResponse<R = unknown> = {
  id: number;
  jsonrpc: string;
  result: R;
};

export type ErrorJson = {
  code: number;
  message: string;
  data?: unknown;
};

export type ErrorResponse = {
  id: number;
  jsonrpc: string;
  error: ErrorJson;
};

export type Response<R = unknown> = ResultResponse<R> | ErrorResponse;

export type Payload<RP extends Params = Params, NP extends Params = Params, R = unknown> =
  | Request<RP>
  | Notification<NP>
  | Response<R>;

export interface Logger {
  info(message: string): void;
  error(message: string, error: unknown): void;
}
