import { Connection } from '../connections/Connection';
import { HttpConnection, HttpConnectionOptions } from '../connections/HttpConnection';
import {
  WebSocketConnection,
  WebSocketConnectionOptions,
} from '../connections/WebSocketConnection';
import { getStandardErrorResponse, RpcError, StandardErrorCodes } from '../utils/errors';
import {
  formatJsonRpcError,
  formatJsonRpcNotification,
  formatJsonRpcRequest,
  formatJsonRpcResult,
} from '../utils/formatters';
import {
  ErrorResponse,
  Notification,
  Payload,
  Request,
  RequestArguments,
  Response,
} from '../utils/types';
import { isHttpUrl } from '../utils/url';
import {
  isJsonRpcError,
  isJsonRpcNotification,
  isJsonRpcRequest,
  isJsonRpcResponse,
} from '../utils/validators';
import { AbstractTransport } from './AbstractTransport';

export type BaseTransportOptions = HttpConnectionOptions & WebSocketConnectionOptions;

export class BaseTransport extends AbstractTransport {
  public connection: Connection;

  constructor(connection: string | Connection, private options: BaseTransportOptions = {}) {
    super();
    this.connection = this.parseConnection(connection);
    this.onConnectionPayload = this.onConnectionPayload.bind(this);
    this.onConnectionClose = this.onConnectionClose.bind(this);
    this.onConnectionError = this.onConnectionError.bind(this);
  }

  async connect(connection: Connection | string = this.connection): Promise<void> {
    await this.open(this.parseConnection(connection));
  }

  async disconnect(): Promise<void> {
    await this.close();
  }

  async request<Result = unknown, Params = unknown>(
    args: RequestArguments<Params>,
    context?: unknown,
  ): Promise<Result> {
    return this.requestStrict(formatJsonRpcRequest(args.method, args.params), context);
  }

  async notify<Params = unknown>(args: RequestArguments<Params>, context?: unknown): Promise<void> {
    return this.notifyStrict(formatJsonRpcNotification(args.method, args.params), context);
  }

  async resolve<Result = unknown>(id: number, result: Result, context?: unknown): Promise<void> {
    return this.respondStrict(formatJsonRpcResult(id, result), context);
  }

  async reject(id: number, error: ErrorResponse, context?: unknown): Promise<void> {
    return this.respondStrict(formatJsonRpcError(id, error), context);
  }

  // ---------- Private ----------------------------------------------- //

  private parseConnection(connection: string | Connection) {
    return typeof connection === 'string'
      ? isHttpUrl(connection)
        ? new HttpConnection(connection, this.options)
        : new WebSocketConnection(connection, this.options)
      : connection;
  }

  private async requestStrict<Result = unknown, Params = unknown>(
    request: Request<Params>,
    context?: unknown,
  ): Promise<Result> {
    if (!this.connection.connected) {
      await this.open();
    }
    return new Promise((resolve, reject) => {
      if (this.options.timeoutMs != null && this.options.timeoutMs !== Infinity) {
        setTimeout(
          () =>
            reject(
              new RpcError(
                getStandardErrorResponse(StandardErrorCodes.CommunicationFailed, 'Request timeout'),
              ),
            ),
          this.options.timeoutMs,
        );
      }
      this.events.once(request.id, response => {
        if (isJsonRpcError(response)) {
          reject(new RpcError(response.error));
        } else {
          resolve(response.result as Result);
        }
      });
      this.connection.send(request, context);
    });
  }

  private async notifyStrict<Params = unknown>(
    notification: Notification<Params>,
    context?: unknown,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(notification, context);
  }

  private async respondStrict<Result = unknown>(
    response: Response<Result>,
    context?: unknown,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(response, context);
  }

  private onConnectionPayload(payload: Payload): void {
    this.events.emit('payload', payload);
    if (isJsonRpcRequest(payload)) {
      this.events.emit('request', payload);
    } else if (isJsonRpcNotification(payload)) {
      this.events.emit('notification', payload);
    } else if (isJsonRpcResponse(payload)) {
      this.events.emit(payload.id, payload);
    }
  }

  private onConnectionClose() {
    this.events.emit('disconnect');
  }

  private onConnectionError(error: Error) {
    this.events.emit('error', error);
  }

  private async open(connection: Connection = this.connection) {
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
