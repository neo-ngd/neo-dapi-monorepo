import { Connection } from '../connections/Connection';
import {
  ErrorResponse,
  EventDispatcher,
  Notification,
  Payload,
  Request,
  RequestArguments,
  Response,
} from '../utils/types';

export interface TransportEvents {
  connect(): void;
  disconnect(): void;
  payload(payload: Payload): void;
  request(request: Request): void;
  [id: number]: (response: Response) => void;
  notification(notification: Notification): void;
  error(error: Error): void;
}

type NewType = Connection;

export interface Transport extends EventDispatcher<TransportEvents> {
  connection: Connection;
  connect(connection?: NewType): Promise<void>;
  disconnect(): Promise<void>;

  request<Result = unknown, Params = unknown>(
    args: RequestArguments<Params>,
    context?: unknown,
  ): Promise<Result>;

  notify<Params = unknown>(args: RequestArguments<Params>, context?: unknown): Promise<void>;

  resolve<Result = unknown>(id: number, result: Result, context?: unknown): Promise<void>;

  reject(id: number, error: ErrorResponse, context?: unknown): Promise<void>;
}
