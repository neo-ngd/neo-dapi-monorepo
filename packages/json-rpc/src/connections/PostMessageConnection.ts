import { parse, stringify } from '../utils/json';
import { Expand } from '../utils/typeUtils';
import { Logger, Payload } from '../utils/types';
import { isPayload } from '../utils/validators';
import { AbstractConnection } from './AbstractConnection';

export type PostMessageConnectionOptions = Expand<{
  logger?: Logger;
}>;

export type PostMessage = (message: string) => void;

export type MessageListener = (message: string) => void;

export type Disposer = () => void;

export type AddMessageListener = (listener: MessageListener) => Disposer | void;

export class PostMessageConnection extends AbstractConnection {
  private disposer: Disposer | null = null;

  private registering = false;

  constructor(
    private postMessage: PostMessage,
    private addMessageListener: AddMessageListener,
    private options: PostMessageConnectionOptions = {},
  ) {
    super();
  }

  connected = false;

  get connecting(): boolean {
    return this.registering;
  }

  async open(): Promise<void> {
    this.disposer = this.addMessageListener(this.onMessage.bind(this)) ?? null;
    this.connected = true;
    this.events.emit('open');
  }

  async close(): Promise<void> {
    this.disposer?.();
    this.connected = false;
    this.events.emit('close');
  }

  async send(payload: Payload, _context?: unknown): Promise<void> {
    if (this.options.logger) {
      this.options.logger.info(`sending: ${stringify(payload)}`);
    }
    this.postMessage(stringify(payload));
  }

  // ---------- Private ----------------------------------------------- /

  private onMessage(message: string) {
    if (this.options.logger) {
      this.options.logger.info(`received: ${message}`);
    }
    const payload = parse(message, null);
    if (isPayload(payload)) {
      this.events.emit('payload', payload);
    }
  }
}
