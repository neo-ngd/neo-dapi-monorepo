import { EventEmitter } from 'events';
import { IJsonRpcTransport, JsonRpcNotification, RpcError } from '@neongd/json-rpc';
import { INeoProvider, ProviderMessage, ProviderRpcError, RequestArguments } from './types';

export * from './types';

export class JsonRpcNeoProvider implements INeoProvider {
  private events = new EventEmitter();

  constructor(private transport: IJsonRpcTransport) {
    this.registerEventListeners();
  }

  on(event: 'connect', listener: () => void): void;
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  on(event: 'message', listener: (message: ProviderMessage) => void): void;
  on(event: 'networkChanged', listener: (network: string) => void): void;
  on(event: 'accountChanged', listener: (account: string) => void): void;
  on(event: string, listener: any): void {
    this.events.on(event, listener);
  }

  removeListener(event: string, listener: any): void {
    this.events.removeListener(event, listener);
  }

  request<R = any, P = any>(args: RequestArguments<P>): Promise<R> {
    return this.transport.request<R, P>(args);
  }

  private registerEventListeners() {
    this.transport.on('disconnect', () => {
      this.transport.connect();
    });
    this.transport.on('notification', (notification: JsonRpcNotification) =>
      this.onNotification(notification),
    );
  }

  private onNotification(notification: JsonRpcNotification) {
    const providerEvents = ['connect', 'disconnect', 'message', 'networkChanged', 'accountChanged'];
    if (providerEvents.includes(notification.method)) {
      if (notification.method === 'disconnect' && notification.params != null) {
        this.events.emit(notification.method, new RpcError(notification.params));
      } else {
        this.events.emit(notification.method, notification.params);
      }
    }
  }
}
