import { EventEmitter } from 'events';
import { safeJsonParse, safeJsonStringify } from 'safe-json-utils';
import { IJsonRpcConnection, JsonRpcPayload } from './types';
import { isWsUrl } from './url';
import { isJsonRpcPayload } from './validators';

const WS = typeof WebSocket !== 'undefined' ? WebSocket : require('ws');

export class WsConnection implements IJsonRpcConnection {
  public events = new EventEmitter();

  private socket: WebSocket | null = null;

  private registering = false;

  constructor(public url: string) {
    if (!isWsUrl(url)) {
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

  public on(event: string, listener: any): void {
    this.events.on(event, listener);
  }

  public once(event: string, listener: any): void {
    this.events.once(event, listener);
  }

  public removeListener(event: string, listener: any): void {
    this.events.removeListener(event, listener);
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

  public async send(payload: JsonRpcPayload, _context?: any): Promise<void> {
    if (!this.socket) {
      this.socket = await this.register();
    }
    this.socket.send(safeJsonStringify(payload));
  }

  // ---------- Private ----------------------------------------------- //

  private register(url = this.url): Promise<WebSocket> {
    if (!isWsUrl(url)) {
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
      const socket: WebSocket = new WS(url);
      socket.onopen = () => {
        this.onOpen(socket);
        resolve(socket);
      };
      socket.onerror = (event: Event) => {
        this.events.emit('error', event);
        reject(event);
      };
    });
  }

  private onOpen(socket: WebSocket) {
    socket.onmessage = (event: MessageEvent) => this.onPayload(event.data);
    socket.onclose = () => this.onClose();
    this.socket = socket;
    this.registering = false;
    this.events.emit('open');
  }

  private onClose() {
    this.socket = null;
    this.events.emit('close');
  }

  private onPayload(data: any) {
    const payload: JsonRpcPayload = typeof data === 'string' ? safeJsonParse(data) : data;
    if (isJsonRpcPayload(payload)) {
      this.events.emit('payload', payload);
    }
  }
}
