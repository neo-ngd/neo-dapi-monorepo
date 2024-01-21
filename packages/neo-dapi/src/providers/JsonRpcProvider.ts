import {
  Json,
  JsonRpcError,
  Notification,
  Params,
  RequestArguments,
  Transport,
} from '@neongd/json-rpc';
import { formatErrorJson } from '@neongd/json-rpc';
import { AbstractProvider } from './AbstractProvider';
import { ProviderEvents } from './Provider';

export class JsonRpcProvider extends AbstractProvider {
  private closed = false;

  constructor(private transport: Transport) {
    super();
    this.registerEventListeners();
  }

  async request<R extends Json = Json, P extends Params = Params>(
    args: RequestArguments<P>,
  ): Promise<R> {
    return this.transport.request(args);
  }

  async close(): Promise<void> {
    this.closed = true;
    return this.transport.disconnect();
  }

  private registerEventListeners() {
    this.transport.on('disconnect', () => {
      if (!this.closed) {
        this.transport.connect();
      }
    });
    this.transport.on('notification', (notification: Notification) =>
      this.onNotification(notification),
    );
  }

  private onNotification(notification: Notification): void {
    const providerEvents = ['connect', 'disconnect', 'message', 'networkChanged', 'accountChanged'];
    if (providerEvents.includes(notification.method as keyof ProviderEvents)) {
      if (notification.method === 'disconnect') {
        this.events.emit(
          notification.method,
          new JsonRpcError(formatErrorJson(notification.params)),
        );
      } else {
        this.events.emit(notification.method as keyof ProviderEvents, notification.params as any);
      }
    }
  }
}
