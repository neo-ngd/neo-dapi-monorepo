import EventEmitter from 'eventemitter3';
import { Payload } from '../utils/types';
import { Connection, ConnectionEvents } from './Connection';

export abstract class AbstractConnection implements Connection {
  abstract connected: boolean;
  abstract connecting: boolean;

  protected events = new EventEmitter<ConnectionEvents>();

  on<T extends EventEmitter.EventNames<ConnectionEvents>>(
    event: T,
    fn: EventEmitter.EventListener<ConnectionEvents, T>,
  ): void {
    this.events.on(event, fn);
  }

  removeListener<T extends EventEmitter.EventNames<ConnectionEvents>>(
    event: T,
    fn: EventEmitter.EventListener<ConnectionEvents, T>,
  ): void {
    this.events.removeListener(event, fn);
  }

  abstract open(): Promise<void>;

  abstract close(): Promise<void>;

  abstract send(payload: Payload, context?: unknown): Promise<void>;
}
