import { EventEmitter } from 'events';
import axios, { AxiosInstance } from 'axios';
import { getStandardError, StandardErrorCodes } from './errors';
import { formatJsonRpcError } from './formatters';
import { parse } from './json';
import { IJsonRpcConnection, JsonRpcPayload } from './types';
import { isHttpUrl } from './url';
import { isJsonRpcPayload } from './validators';

export class HttpConnection implements IJsonRpcConnection {
  public events = new EventEmitter();

  private api: AxiosInstance | null = null;

  private registering = false;

  constructor(public url: string) {
    if (!isHttpUrl(url)) {
      throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
    }
    this.url = url;
  }

  get connected(): boolean {
    return !!this.api;
  }

  get connecting(): boolean {
    return this.registering;
  }

  public on(event: string, listener: any): void {
    this.events.on(event, listener);
  }

  public removeListener(event: string, listener: any): void {
    this.events.removeListener(event, listener);
  }

  public async open(url: string = this.url): Promise<void> {
    this.api = await this.register(url);
  }

  public async close(): Promise<void> {
    this.onClose();
  }

  public async send(payload: JsonRpcPayload, _context?: any): Promise<void> {
    if (!this.api) {
      this.api = await this.register();
    }
    this.api
      .post('/', payload)
      .then(res => this.onPayload(res.data))
      .catch(err => 'id' in payload && this.onError(payload.id, err));
  }

  // ---------- Private ----------------------------------------------- //

  private async register(url = this.url): Promise<AxiosInstance> {
    if (!isHttpUrl(url)) {
      throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
    }
    if (this.registering) {
      return new Promise((resolve, reject) => {
        this.events.once('open', () => {
          if (!this.api) {
            return reject(new Error('HTTP connection is missing or invalid'));
          }
          resolve(this.api);
        });
      });
    }
    this.url = url;
    this.registering = true;
    const api = axios.create({
      baseURL: url,
      timeout: 30_000, // 30 secs
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.onOpen(api);
    return api;
  }

  private onOpen(api: AxiosInstance) {
    this.api = api;
    this.registering = false;
    this.events.emit('open');
  }

  private onClose() {
    this.api = null;
    this.events.emit('close');
  }

  private onPayload(data: any) {
    const payload: JsonRpcPayload = typeof data === 'string' ? parse(data, {}) : data;
    if (isJsonRpcPayload(payload)) {
      this.events.emit('payload', payload);
    }
  }

  private onError(id: number, e: Error) {
    const message = e.message ?? e.toString();
    const error = {
      ...getStandardError(StandardErrorCodes.ServerError),
      message,
    };
    const payload = formatJsonRpcError(id, error);
    this.events.emit('payload', payload);
  }
}
