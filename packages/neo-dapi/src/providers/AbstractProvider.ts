import EventEmitter from 'eventemitter3';
import { Provider, ProviderEvents, RequestArguments } from './Provider';

export abstract class AbstractProvider implements Provider {
  protected events = new EventEmitter<ProviderEvents>();

  on<T extends EventEmitter.EventNames<ProviderEvents>>(
    event: T,
    fn: EventEmitter.EventListener<ProviderEvents, T>,
  ): void {
    this.events.on(event, fn);
  }

  removeListener<T extends EventEmitter.EventNames<ProviderEvents>>(
    event: T,
    fn: EventEmitter.EventListener<ProviderEvents, T>,
  ): void {
    this.events.removeListener(event, fn);
  }

  abstract request<R = unknown, P = unknown>(args: RequestArguments<P>): Promise<R>;

  abstract close(): Promise<void>;
}
