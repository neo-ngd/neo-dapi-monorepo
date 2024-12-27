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
  public connection: Connection;
  private connected = false;
  private lock = new Lock();

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

  async request<R = unknown, P extends Params = Params>(
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

  async resolve<R = unknown>(id: number, result: R, context?: unknown): Promise<void> {
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

  private async requestStrict<R = unknown, P extends Params = Params>(
    request: Request<P>,
    context?: unknown,
  ): Promise<R> {
    if (!this.connected) {
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
    if (!this.connected) {
      await this.open();
    }
    await this.connection.send(notification, context);
  }

  private async respondStrict<R = unknown>(
    response: Response<R>,
    context?: unknown,
  ): Promise<void> {
    if (!this.connected) {
      await this.open();
    }
    await this.connection.send(response, context);
  }

  private async open(connection: Connection = this.connection) {
    await this.lock.acquire();
    try {
      if (this.connected) {
        if (this.connection === connection) {
          return;
        } else {
          await this.close(true);
        }
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
      this.connected = true;
      this.events.emit('connect');
    } finally {
      this.lock.release();
    }
  }

  private async close(noLock = false) {
    if (!noLock) {
      await this.lock.acquire();
    }
    try {
      if (!this.connected) {
        return;
      }
      this.connection.removeListener('close', this.onConnectionClose);
      this.connection.removeListener('error', this.onConnectionError);
      this.connection.removeListener('payload', this.onConnectionPayload);
      await this.connection.close();
      this.connected = false;
      this.events.emit('disconnect');
    } finally {
      if (!noLock) {
        this.lock.release();
      }
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
