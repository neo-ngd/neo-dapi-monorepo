import { Lock } from 'async-await-mutex-lock';
import { Connection } from '../connections/Connection';
import { HttpConnection, HttpConnectionOptions } from '../connections/HttpConnection';
import {
  WebSocketConnection,
  WebSocketConnectionOptions,
} from '../connections/WebSocketConnection';
import { getStandardErrorJson, JsonRpcError, StandardErrorCodes } from '../utils/errors';
import {
  formatErrorResponse,
  formatNotification,
  formatRequest,
  formatResultResponse,
} from '../utils/formatters';
import { Expand } from '../utils/typeUtils';
import {
  ErrorJson,
  Json,
  Notification,
  Params,
  Payload,
  Request,
  RequestArguments,
  Response,
} from '../utils/types';
import {
  isErrorResponse,
  isHttpUrl,
  isNotification,
  isRequest,
  isResponse,
} from '../utils/validators';
import { AbstractTransport } from './AbstractTransport';

export type BaseTransportOptions = Expand<HttpConnectionOptions & WebSocketConnectionOptions>;

export class BaseTransport extends AbstractTransport {
  private lock = new Lock();
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

  async request<R extends Json = Json, P extends Params = Params>(
    args: RequestArguments<P>,
    context?: unknown,
  ): Promise<R> {
    return this.requestStrict(formatRequest(args.method, args.params), context);
  }

  async notify<P extends Params = Params>(
    args: RequestArguments<P>,
    context?: unknown,
  ): Promise<void> {
    return this.notifyStrict(formatNotification(args.method, args.params), context);
  }

  async resolve<R extends Json = Json>(id: number, result: R, context?: unknown): Promise<void> {
    return this.respondStrict(formatResultResponse(id, result), context);
  }

  async reject(id: number, errorJson: ErrorJson, context?: unknown): Promise<void> {
    return this.respondStrict(formatErrorResponse(id, errorJson), context);
  }

  private parseConnection(connection: string | Connection) {
    return typeof connection === 'string'
      ? isHttpUrl(connection)
        ? new HttpConnection(connection, this.options)
        : new WebSocketConnection(connection, this.options)
      : connection;
  }

  private async requestStrict<R extends Json = Json, P extends Params = Params>(
    request: Request<P>,
    context?: unknown,
  ): Promise<R> {
    if (!this.connection.connected) {
      await this.open();
    }
    return new Promise((resolve, reject) => {
      if (this.options.timeoutMs != null && this.options.timeoutMs !== Infinity) {
        setTimeout(
          () =>
            reject(
              new JsonRpcError(
                getStandardErrorJson(StandardErrorCodes.CommunicationFailed, 'Request timeout'),
              ),
            ),
          this.options.timeoutMs,
        );
      }
      this.events.once(request.id, response => {
        if (isErrorResponse(response)) {
          reject(new JsonRpcError(response.error));
        } else {
          resolve(response.result as R);
        }
      });
      this.connection.send(request, context);
    });
  }

  private async notifyStrict<P extends Params = Params>(
    notification: Notification<P>,
    context?: unknown,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(notification, context);
  }

  private async respondStrict<R extends Json = Json>(
    response: Response<R>,
    context?: unknown,
  ): Promise<void> {
    if (!this.connection.connected) {
      await this.open();
    }
    await this.connection.send(response, context);
  }

  private async open(connection: Connection = this.connection) {
    await this.lock.acquire();
    try {
      if (this.connection === connection && this.connection.connected) {
        return;
      }
      if (this.connection.connected) {
        await this.close();
      }
      this.connection = connection;
      await this.connection.open().catch(error => {
        throw new JsonRpcError(
          getStandardErrorJson(StandardErrorCodes.CommunicationFailed, error.message),
        );
      });
      this.connection.on('close', this.onConnectionClose);
      this.connection.on('error', this.onConnectionError);
      this.connection.on('payload', this.onConnectionPayload);
      this.events.emit('connect');
    } finally {
      this.lock.release();
    }
  }

  private async close() {
    await this.lock.acquire();
    try {
      this.connection.removeListener('close', this.onConnectionClose);
      this.connection.removeListener('error', this.onConnectionError);
      this.connection.removeListener('payload', this.onConnectionPayload);
      await this.connection.close();
      this.events.emit('disconnect');
    } finally {
      this.lock.release();
    }
  }

  private onConnectionClose() {
    this.close();
  }

  private onConnectionError(error: Error) {
    this.events.emit('error', error);
  }

  private onConnectionPayload(payload: Payload): void {
    this.events.emit('payload', payload);
    if (isRequest(payload)) {
      this.events.emit('request', payload);
    } else if (isNotification(payload)) {
      this.events.emit('notification', payload);
    } else if (isResponse(payload)) {
      this.events.emit(payload.id, payload);
    }
  }
}
