import { EventEmitter } from 'events';
import { RpcError } from './errors';
import {
  formatJsonRpcError,
  formatJsonRpcNotification,
  formatJsonRpcRequest,
  formatJsonRpcResult,
} from './formatters';
import { HttpConnection } from './httpConnection';
import {
  ErrorResponse,
  IJsonRpcConnection,
  IJsonRpcTransport,
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
import { WsConnection } from './wsConnection';

export class JsonRpcTransport implements IJsonRpcTransport {
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

  removeListener(event: string, listener: any): void {
    this.events.removeListener(event, listener);
  }

  async request<Result = any, Params = any>(
    args: RequestArguments<Params>,
    context?: any,
  ): Promise<Result> {
    return this.requestStrict(formatJsonRpcRequest(args.method, args.params), context);
  }

  async notify<Params = any>(args: RequestArguments<Params>, context?: any): Promise<void> {
    return this.notifyStrict(formatJsonRpcNotification(args.method, args.params), context);
  }

  async resolve<Result = any>(id: number, result: Result, context?: any): Promise<void> {
    return this.respondStrict(formatJsonRpcResult(id, result), context);
  }

  async reject(id: number, error: ErrorResponse, context?: any): Promise<void> {
    return this.respondStrict(formatJsonRpcError(id, error), context);
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
    context?: any,
  ): Promise<Result> {
    if (!this.connection.connected) {
      await this.open();
    }
    return new Promise((resolve, reject) => {
      this.events.on(`${request.id}`, (response: JsonRpcResponse) => {
        if (isJsonRpcError(response)) {
          reject(new RpcError(response.error));
        } else {
          resolve(response.result);
        }
      });
      this.connection.send(request, context);
    });
  }

  private async notifyStrict<Params = any>(
    notification: JsonRpcNotification<Params>,
    context?: any,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(notification, context);
  }

  private async respondStrict<Result = any>(
    response: JsonRpcResponse<Result>,
    context?: any,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(response, context);
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
