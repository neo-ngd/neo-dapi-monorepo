import { Notification, RpcError, Transport } from '@neongd/json-rpc';
import { AbstractProvider } from './AbstractProvider';
import { ProviderEvents, RequestArguments } from './Provider';

export class JsonRpcProvider extends AbstractProvider {
  private closed = false;

  constructor(private transport: Transport) {
    super();
    this.registerEventListeners();
  }

  async request<R = unknown, P = unknown>(args: RequestArguments<P>): Promise<R> {
    return this.transport.request<R, P>(args);
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
    const providerEvents = [
      'connect',
      'disconnect',
      'message',
      'networkChanged',
      'accountChanged',
    ] as const;
    if (providerEvents.includes(notification.method as keyof ProviderEvents)) {
      if (notification.method === 'disconnect' && notification.params != null) {
        this.events.emit(notification.method, new RpcError(notification.params as any));
      } else {
        this.events.emit(notification.method as keyof ProviderEvents, notification.params as any);
      }
    }
  }
}
