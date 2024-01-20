import { Json, Params, RequestArguments } from '@neongd/json-rpc';
import { EventDispatcher } from '../utils/types';

export interface ProviderError extends Error {
  code: number;
  data?: unknown;
}

export type ProviderMessage = {
  type: string;
  data?: unknown;
};

export type ProviderEvents = {
  connect(): void;
  disconnect(error: ProviderError): void;
  message(message: ProviderMessage): void;
  networkChanged(network: string): void;
  accountChanged(account: string): void;
};

export interface Provider extends EventDispatcher<ProviderEvents> {
  request<R extends Json = Json, P extends Params = Params>(args: RequestArguments<P>): Promise<R>;
}
