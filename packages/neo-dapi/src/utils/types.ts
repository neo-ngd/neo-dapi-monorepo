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
