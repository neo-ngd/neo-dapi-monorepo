import EventEmitter from 'eventemitter3';
import { Connection } from '../connections/Connection';
import { ErrorJson, Params, RequestArguments } from '../utils/types';
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

  abstract request<R = unknown, P extends Params = Params>(
    args: RequestArguments<P>,
    context?: unknown,
  ): Promise<R>;

  abstract notify<P extends Params = Params>(
    args: RequestArguments<P>,
    context?: unknown,
  ): Promise<void>;

  abstract resolve<R = unknown>(id: number, result: R, context?: unknown): Promise<void>;

  abstract reject(id: number, errorJson: ErrorJson, context?: unknown): Promise<void>;
}
