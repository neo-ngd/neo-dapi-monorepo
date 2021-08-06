import { EventEmitter } from 'events';
import { parse, stringify } from './json';
import {
  AddMessageListener,
  Disposer,
  IJsonRpcConnection,
  JsonRpcPayload,
  Logger,
  PostMessage,
} from './types';
import { isJsonRpcPayload } from './validators';

export class PostMessageConnection implements IJsonRpcConnection {
  private events = new EventEmitter();

  private disposer: Disposer | null = null;

  private registering = false;

  constructor(
    private postMessage: PostMessage,
    private addMessageListener: AddMessageListener,
    private topic: string = '@neongd/json-rpc',
    private logger: Logger | null = null,
  ) {}

  connected = false;

  get connecting(): boolean {
    return this.registering;
  }

  async open(): Promise<void> {
    this.disposer = this.addMessageListener(this.onMessage.bind(this)) || null;
    this.connected = true;
    this.events.emit('open');
  }

  async close(): Promise<void> {
    this.disposer?.();
    this.connected = false;
    this.events.emit('close');
  }

  on(event: string, listener: any): void {
    this.events.on(event, listener);
  }

  once(event: string, listener: any): void {
    this.events.once(event, listener);
  }

  removeListener(event: string, listener: any): void {
    this.events.removeListener(event, listener);
  }

  async send(payload: JsonRpcPayload, _context?: any): Promise<void> {
    if (this.logger) {
      this.logger.log('postMessage', stringify({ topic: this.topic, payload: payload }));
    }
    this.postMessage(stringify({ topic: this.topic, payload: payload }));
  }

  // ---------- Private ----------------------------------------------- /

  private onMessage(message: string) {
    if (this.logger) {
      this.logger.log('onMessage', message);
    }
    const data = parse(message, null);
    if (data != null && data.topic === this.topic && isJsonRpcPayload(data.payload)) {
      this.events.emit('payload', data.payload);
    }
  }
}
