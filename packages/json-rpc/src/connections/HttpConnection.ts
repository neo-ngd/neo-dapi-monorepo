import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getStandardErrorJson, StandardErrorCodes } from '../utils/errors';
import { formatErrorResponse } from '../utils/formatters';
import { parse, stringify } from '../utils/json';
import { Logger, Payload } from '../utils/types';
import { isHttpUrl } from '../utils/url';
import { isPayload } from '../utils/validators';
import { AbstractConnection } from './AbstractConnection';

export type HttpConnectionOptions = {
  axiosConfig?: AxiosRequestConfig;
  timeoutMs?: number;
  logger?: Logger;
};

export class HttpConnection extends AbstractConnection {
  private api: AxiosInstance | null = null;

  private registering = false;

  constructor(public url: string, private options: HttpConnectionOptions = {}) {
    super();
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

  public async open(url: string = this.url): Promise<void> {
    this.api = await this.register(url);
  }

  public async close(): Promise<void> {
    this.onClose();
  }

  public async send(payload: Payload, _context?: unknown): Promise<void> {
    if (!this.api) {
      this.api = await this.register();
    }
    if (this.options.logger) {
      this.options.logger.info(`sending: ${stringify(payload)}`);
    }
    this.api
      .post('/', payload)
      .then(res => 'id' in payload && this.onPayload(payload.id, res.data))
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
      timeout: this.options.timeoutMs,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...this.options.axiosConfig,
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

  private onPayload(id: number, data: unknown) {
    const payload = typeof data === 'string' ? parse(data, {}) : data;
    if (this.options.logger) {
      this.options.logger.info(`received: ${stringify(data)}`);
    }
    if (isPayload(payload)) {
      this.events.emit('payload', payload);
    } else {
      const errorJson = getStandardErrorJson(StandardErrorCodes.ParseError);
      const payload = formatErrorResponse(id, errorJson);
      this.events.emit('payload', payload);
    }
  }

  private onError(id: number, error: Error) {
    if (this.options.logger) {
      this.options.logger.error('error', error);
    }
    const errorJson = getStandardErrorJson(StandardErrorCodes.CommunicationFailed, error.message);
    const payload = formatErrorResponse(id, errorJson);
    this.events.emit('payload', payload);
  }
}
