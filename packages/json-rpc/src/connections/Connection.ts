import { EventDispatcher, Payload } from '../utils/types';

export type ConnectionEvents = {
  open(): void;
  close(): void;
  error(error: Error): void;
  payload(payload: Payload): void;
};

export interface Connection extends EventDispatcher<ConnectionEvents> {
  connected: boolean;
  connecting: boolean;

  open(): Promise<void>;

  close(): Promise<void>;

  send(payload: Payload, context?: unknown): Promise<void>;
}
