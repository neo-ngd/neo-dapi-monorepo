import { EventDispatcher } from '../utils/types';

export interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

export interface ProviderMessage {
  type: string;
  data?: unknown;
}

export interface RequestArguments<T = unknown> {
  method: string;
  params?: T;
}

export interface ProviderEvents {
  connect(): void;
  disconnect(error: ProviderRpcError): void;
  message(message: ProviderMessage): void;
  networkChanged(network: string): void;
  accountChanged(account: string): void;
}

export interface Provider extends EventDispatcher<ProviderEvents> {
  request<R = unknown, P = unknown>(args: RequestArguments<P>): Promise<R>;
}
