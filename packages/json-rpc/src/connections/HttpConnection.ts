import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getStandardErrorJson, StandardErrorCodes } from '../utils/errors';
import { formatErrorResponse } from '../utils/formatters';
import { parse, stringify } from '../utils/json';
import { Expand } from '../utils/typeUtils';
import { Logger, Payload } from '../utils/types';
import { isHttpUrl, isPayload } from '../utils/validators';
import { AbstractConnection } from './AbstractConnection';

export type HttpConnectionOptions = Expand<{
  axiosConfig?: AxiosRequestConfig;
  timeoutMs?: number;
  logger?: Logger;
}>;

export class HttpConnection extends AbstractConnection {
  private api: AxiosInstance | null = null;

  constructor(public url: string, private options: HttpConnectionOptions = {}) {
    super();
    if (!isHttpUrl(url)) {
      throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
    }
  }

  get connecting(): boolean {
    return false;
  }

  get connected(): boolean {
    return !!this.api;
  }

  public async open(): Promise<void> {
    this.api = axios.create({
      baseURL: this.url,
      timeout: this.options.timeoutMs,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...this.options.axiosConfig,
    });
    this.events.emit('open');
  }

  public async close(): Promise<void> {
    this.api = null;
    this.events.emit('close');
  }

  public async send(payload: Payload, _context?: unknown): Promise<void> {
    if (!this.api) {
      throw Error('Api is not inited');
    }
    if (this.options.logger) {
      this.options.logger.info(`sending: ${stringify(payload)}`);
    }
    this.api
      .post('/', payload)
      .then(res => 'id' in payload && this.onResolve(payload.id, res.data))
      .catch(err => 'id' in payload && this.onReject(payload.id, err));
  }

  // ---------- Private ----------------------------------------------- //
  private onResolve(id: number, data: unknown) {
    const payload = typeof data === 'string' ? parse(data, {}) : data;
    if (this.options.logger) {
      this.options.logger.info(`received: ${typeof data === 'string' ? data : stringify(data)}`);
    }
    if (isPayload(payload)) {
      this.events.emit('payload', payload);
    } else {
      const errorJson = getStandardErrorJson(StandardErrorCodes.ParseError);
      const payload = formatErrorResponse(id, errorJson);
      this.events.emit('payload', payload);
    }
  }

  private onReject(id: number, error: Error) {
    if (this.options.logger) {
      this.options.logger.error('error', error);
    }
    const errorJson = getStandardErrorJson(StandardErrorCodes.CommunicationFailed, error.message);
    const payload = formatErrorResponse(id, errorJson);
    this.events.emit('payload', payload);
  }
}
