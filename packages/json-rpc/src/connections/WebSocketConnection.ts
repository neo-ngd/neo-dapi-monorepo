import { Buffer } from 'buffer';
import { w3cwebsocket as WebSocket } from 'websocket';
import { parse, stringify } from '../utils/json';
import { Expand } from '../utils/typeUtils';
import { Logger, Payload } from '../utils/types';
import { isPayload, isWebSocketUrl } from '../utils/validators';
import { AbstractConnection } from './AbstractConnection';

export type WebSocketConnectionOptions = Expand<{
  logger?: Logger;
}>;

export class WebSocketConnection extends AbstractConnection {
  private socketPromise: Promise<void> | null = null;
  private socket: WebSocket | null = null;

  constructor(public url: string, private options: WebSocketConnectionOptions = {}) {
    super();
    if (!isWebSocketUrl(url)) {
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
    }
  }

  get connecting(): boolean {
    return !!this.socketPromise;
  }

  get connected(): boolean {
    return !!this.socket;
  }

  public async open(): Promise<void> {
    if (this.socketPromise) {
      return this.socketPromise;
    }
    this.socketPromise = new Promise((resolve, reject) => {
      const socket = new WebSocket(this.url);
      socket.onopen = () => {
        this.socketPromise = null;
        this.socket = socket;
        this.socket.onclose = () => this.close();
        this.socket.onerror = error => this.onError(error);
        this.socket.onmessage = event => this.onMessage(event.data);
        this.events.emit('open');
        resolve();
      };
      socket.onerror = error => {
        this.socketPromise = null;
        reject(error);
      };
    });
    await this.socketPromise;
  }

  public async close(): Promise<void> {
    if (this.socketPromise) {
      await Promise.allSettled([this.socketPromise]);
    }
    if (this.socket) {
      this.socket.onopen = () => undefined;
      this.socket.onclose = () => undefined;
      this.socket.onerror = () => undefined;
      this.socket.onmessage = () => undefined;
      this.socket.close();
    }
    this.socket = null;
    this.events.emit('close');
  }

  public async send(payload: Payload, _context?: unknown): Promise<void> {
    if (!this.socket) {
      throw Error('Socket is not inited');
    }
    if (this.options.logger) {
      this.options.logger.info(`sending: ${stringify(payload)}`);
    }
    this.socket.send(stringify(payload));
  }

  private onError(error: Error) {
    if (this.options.logger) {
      this.options.logger.error('error', error);
    }
    this.events.emit('error', error);
  }

  private onMessage(data: string | Buffer | ArrayBuffer) {
    const payload = parse(data.toString(), null);
    if (this.options.logger) {
      this.options.logger.info(`received: ${data.toString()}`);
    }
    if (isPayload(payload)) {
      this.events.emit('payload', payload);
    }
  }
}
