import { EventEmitter } from 'events';
import {
  formatJsonRpcError,
  formatJsonRpcNotification,
  formatJsonRpcRequest,
  formatJsonRpcResult,
} from './formatters';
import { HttpConnection } from './http';
import {
  ErrorResponse,
  IJsonRpcConnection,
  IJsonRpcProxy,
  JsonRpcNotification,
  JsonRpcPayload,
  JsonRpcRequest,
  JsonRpcResponse,
  RequestArguments,
} from './types';
import { isHttpUrl } from './url';
import {
  isJsonRpcError,
  isJsonRpcNotification,
  isJsonRpcRequest,
  isJsonRpcResponse,
} from './validators';
import { WsConnection } from './ws';

export class JsonRpcProxy implements IJsonRpcProxy {
  public connection: IJsonRpcConnection;

  private events = new EventEmitter();

  constructor(connection: string | IJsonRpcConnection) {
    this.connection = this.parseConnection(connection);
    this.onConnectionPayload = this.onConnectionPayload.bind(this);
    this.onConnectionClose = this.onConnectionClose.bind(this);
    this.onConnectionError = this.onConnectionError.bind(this);
  }

  async connect(connection: IJsonRpcConnection | string = this.connection): Promise<void> {
    await this.open(this.parseConnection(connection));
  }

  async disconnect(): Promise<void> {
    await this.close();
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

  async request<Result = any, Params = any>(
    args: RequestArguments<Params>,
    _context?: any,
  ): Promise<Result> {
    return this.requestStrict(formatJsonRpcRequest(args.method, args.params));
  }

  async notify<Params = any>(args: RequestArguments<Params>, _context?: any): Promise<void> {
    return this.notifyStrict(formatJsonRpcNotification(args.method, args.params));
  }

  async resolve<Result = any>(id: number, result: Result, _context?: any): Promise<void> {
    return this.respondStrict(formatJsonRpcResult(id, result));
  }

  async reject(id: number, error: ErrorResponse, _context?: any): Promise<void> {
    return this.respondStrict(formatJsonRpcError(id, error));
  }

  // ---------- Private ----------------------------------------------- //

  private parseConnection(connection: string | IJsonRpcConnection) {
    return typeof connection === 'string'
      ? isHttpUrl(connection)
        ? new HttpConnection(connection)
        : new WsConnection(connection)
      : connection;
  }

  private async requestStrict<Result = any, Params = any>(
    request: JsonRpcRequest<Params>,
  ): Promise<Result> {
    if (!this.connection.connected) {
      await this.open();
    }
    return new Promise((resolve, reject) => {
      this.events.on(`${request.id}`, (response: JsonRpcResponse) => {
        if (isJsonRpcError(response)) {
          reject(response.error);
        } else {
          resolve(response.result);
        }
      });
      this.connection.send(request);
    });
  }

  private async notifyStrict<Params = any>(
    notification: JsonRpcNotification<Params>,
    _context?: any,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(notification);
  }

  private async respondStrict<Result = any>(
    response: JsonRpcResponse<Result>,
    _context?: any,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(response);
  }

  private onConnectionPayload(payload: JsonRpcPayload): void {
    this.events.emit('payload', payload);
    if (isJsonRpcRequest(payload)) {
      this.events.emit('request', payload);
    } else if (isJsonRpcNotification(payload)) {
      this.events.emit('notification', payload);
    } else if (isJsonRpcResponse(payload)) {
      this.events.emit(`${payload.id}`, payload);
    }
  }

  private onConnectionClose() {
    this.events.emit('disconnect');
  }

  private onConnectionError() {
    this.events.emit('error');
  }

  private async open(connection: IJsonRpcConnection = this.connection) {
    if (this.connection === connection && this.connection.connected) {
      return;
    }
    if (this.connection.connected) {
      this.close();
    }
    this.connection = connection;
    await this.connection.open();
    this.connection.on('payload', this.onConnectionPayload);
    this.connection.on('close', this.onConnectionClose);
    this.connection.on('error', this.onConnectionError);
    this.events.emit('connect');
  }

  private async close() {
    await this.connection.close();
    this.connection.removeListener('payload', this.onConnectionPayload);
    this.connection.removeListener('close', this.onConnectionClose);
    this.connection.removeListener('error', this.onConnectionError);
    this.events.emit('disconnect');
  }
}
