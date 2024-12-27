import { Connection } from '../connections/Connection';
import {
  ErrorJson,
  EventDispatcher,
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
  error(error: Error): void;
  payload(payload: Payload): void;
  request(request: Request): void;
  notification(notification: Notification): void;
  [id: number]: (response: Response) => void;
};

export interface Transport extends EventDispatcher<TransportEvents> {
  connection: Connection;

  connect(connection?: Connection): Promise<void>;

  disconnect(): Promise<void>;

  request<R = unknown, P extends Params = Params>(
    args: RequestArguments<P>,
    context?: unknown,
  ): Promise<R>;

  notify<P extends Params = Params>(args: RequestArguments<P>, context?: unknown): Promise<void>;

  resolve<R = unknown>(id: number, result: R, context?: unknown): Promise<void>;

  reject(id: number, errorJson: ErrorJson, context?: unknown): Promise<void>;
}
