import { Connection } from '../connections/Connection';
import {
  ErrorJson,
  EventDispatcher,
  Json,
  Notification,
  Params,
  Payload,
  Request,
  RequestArguments,
  Response,
} from '../utils/types';

export type TransportEvents = {
  connect(): void;
  disconnect(): void;
  payload(payload: Payload): void;
  request(request: Request): void;
  [id: number]: (response: Response) => void;
  notification(notification: Notification): void;
  error(error: Error): void;
};

export interface Transport extends EventDispatcher<TransportEvents> {
  connection: Connection;
  connect(connection?: Connection): Promise<void>;
  disconnect(): Promise<void>;

  request<R extends Json = Json, P extends Params = Params>(
    args: RequestArguments<P>,
    context?: unknown,
  ): Promise<R>;

  notify<P extends Params = Params>(args: RequestArguments<P>, context?: unknown): Promise<void>;

  resolve<R extends Json = Json>(id: number, result: R, context?: unknown): Promise<void>;

  reject(id: number, errorJson: ErrorJson, context?: unknown): Promise<void>;
}
