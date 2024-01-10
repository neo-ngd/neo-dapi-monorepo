import EventEmitter from 'eventemitter3';
import { Connection } from '../connections/Connection';
import { ErrorResponse, RequestArguments } from '../utils/types';
import { Transport, TransportEvents } from './Transport';

export abstract class AbstractTransport implements Transport {
  abstract connection: Connection;

  protected events = new EventEmitter<TransportEvents>();

  on<T extends EventEmitter.EventNames<TransportEvents>>(
    event: T,
    fn: EventEmitter.EventListener<TransportEvents, T>,
  ): void {
    this.events.on(event, fn);
  }

  removeListener<T extends EventEmitter.EventNames<TransportEvents>>(
    event: T,
    fn: EventEmitter.EventListener<TransportEvents, T>,
  ): void {
    this.events.removeListener(event, fn);
  }

  abstract connect(connection?: Connection | undefined): Promise<void>;

  abstract disconnect(): Promise<void>;

  abstract request<Result = unknown, Params = unknown>(
    args: RequestArguments<Params>,
    context?: unknown,
  ): Promise<Result>;

  abstract notify<Params = unknown>(
    args: RequestArguments<Params>,
    context?: unknown,
  ): Promise<void>;

  abstract resolve<Result = unknown>(id: number, result: Result, context?: unknown): Promise<void>;

  abstract reject(id: number, error: ErrorResponse, context?: unknown): Promise<void>;
}
