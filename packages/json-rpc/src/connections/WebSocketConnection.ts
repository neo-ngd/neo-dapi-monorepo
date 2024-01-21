import { w3cwebsocket as WebSocket } from 'websocket';
import { parse, stringify } from '../utils/json';
import { Logger, Payload } from '../utils/types';
import { isPayload, isWebSocketUrl } from '../utils/validators';
import { AbstractConnection } from './AbstractConnection';

export type WebSocketConnectionOptions = {
  logger?: Logger;
};

export class WebSocketConnection extends AbstractConnection {
  private socket: WebSocket | null = null;

  private registering = false;

  constructor(public url: string, private options: WebSocketConnectionOptions = {}) {
    super();
    if (!isWebSocketUrl(url)) {
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
    }
    this.url = url;
  }

  get connected(): boolean {
    return !!this.socket;
  }

  get connecting(): boolean {
    return this.registering;
  }

  public async open(url: string = this.url): Promise<void> {
    this.socket = await this.register(url);
  }

  public async close(): Promise<void> {
    if (!this.socket) {
      throw new Error('Already disconnected');
    }
    this.socket.close();
    this.onClose();
  }

  public async send(payload: Payload, _context?: unknown): Promise<void> {
    if (!this.socket) {
      this.socket = await this.register();
    }
    if (this.options.logger) {
      this.options.logger.info(`sending: ${stringify(payload)}`);
    }
    this.socket.send(stringify(payload));
  }

  // ---------- Private ----------------------------------------------- //

  private async register(url = this.url): Promise<WebSocket> {
    if (!isWebSocketUrl(url)) {
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
    }
    if (this.registering) {
      return new Promise((resolve, reject) => {
        this.events.once('open', () => {
          if (!this.socket) {
            return reject(new Error('WebSocket connection is missing or invalid'));
          }
          resolve(this.socket);
        });
      });
    }
    this.url = url;
    this.registering = true;

    return new Promise((resolve, reject) => {
      const socket = new WebSocket(url);
      socket.onopen = () => {
        this.onOpen(socket);
        resolve(socket);
      };
      socket.onerror = error => {
        this.events.emit('error', error);
        reject(error);
      };
    });
  }

  private onOpen(socket: WebSocket) {
    socket.onmessage = event => this.onPayload(event.data);
    socket.onclose = () => this.onClose();
    this.socket = socket;
    this.registering = false;
    this.events.emit('open');
  }

  private onClose() {
    this.socket = null;
    this.events.emit('close');
  }

  private onPayload(data: unknown) {
    const payload = typeof data === 'string' ? parse(data, {}) : data;
    if (this.options.logger) {
      this.options.logger.info(`received: ${data}`);
    }
    if (isPayload(payload)) {
      this.events.emit('payload', payload);
    }
  }
}
