import { EventEmitter } from 'events';
import { JsonRpcNotification, JsonRpcProxy } from '@neongd/json-rpc';
import {
  INeoProvider,
  ProviderAccounts,
  ProviderChainId,
  ProviderEvent,
  ProviderInfo,
  ProviderListener,
  ProviderMessage,
  ProviderRpcError,
  RequestArguments,
} from './types';

export * from './types';

export class JsonRpcNeoProvider implements INeoProvider {
  private events = new EventEmitter();

  constructor(public proxy: JsonRpcProxy) {
    this.registerEventListeners();
  }

  async enable(): Promise<ProviderAccounts> {
    const accounts = await this.request({ method: 'getAccount' });
    return accounts as ProviderAccounts;
  }

  on(event: 'connect', listener: (info: ProviderInfo) => void): void;
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  on(event: 'message', listener: (message: ProviderMessage) => void): void;
  on(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  on(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
  on(event: ProviderEvent, listener: ProviderListener): void {
    this.events.on(event, listener);
  }

  once(event: 'connect', listener: (info: ProviderInfo) => void): void;
  once(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  once(event: 'message', listener: (message: ProviderMessage) => void): void;
  once(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  once(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
  once(event: ProviderEvent, listener: ProviderListener): void {
    this.events.once(event, listener);
  }

  removeListener(event: string, listener: any): void {
    this.events.removeListener(event, listener);
  }

  request<R = any, P = any>(args: RequestArguments<P>): Promise<R> {
    return this.proxy.request<R, P>(args);
  }

  private registerEventListeners(): void {
    this.proxy.on('disconnect', () => {
      this.proxy.connect();
    });
    this.proxy.on('notification', (notification: JsonRpcNotification) =>
      this.onNotification(notification),
    );
  }

  private onNotification(notification: JsonRpcNotification) {
    const providerEvents = ['connect', 'disconnect', 'message', 'chainChanged', 'accountsChanged'];
    if (providerEvents.includes(notification.method)) {
      this.events.emit(notification.method, notification.params);
    }
  }
}
