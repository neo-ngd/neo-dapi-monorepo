export interface IEvents {
  on(event: string, listener: any): void;
  once(event: string, listener: any): void;
  removeListener(event: string, listener: any): void;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: any;
}

export interface ProviderMessage {
  type: string;
  data?: any;
}

export type ProviderNetwork = string;

export interface ProviderAccount {
  address: string;
  label?: string;
}

export type ProviderEvent =
  | 'connect'
  | 'disconnect'
  | 'message'
  | 'networkChanged'
  | 'accountChanged';

export type ProviderListener =
  | (() => void)
  | ((error: ProviderRpcError) => void)
  | ((message: ProviderMessage) => void)
  | ((network: ProviderNetwork) => void)
  | ((account: ProviderAccount) => void);

export interface RequestArguments<T = any> {
  method: string;
  params?: T;
}

export interface INeoProvider extends IEvents {
  enable(): Promise<ProviderAccount>;

  on(event: 'connect', listener: () => void): void;
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  on(event: 'message', listener: (message: ProviderMessage) => void): void;
  on(event: 'networkChanged', listener: (network: ProviderNetwork) => void): void;
  on(event: 'accountChanged', listener: (account: ProviderAccount) => void): void;

  once(event: 'connect', listener: () => void): void;
  once(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  once(event: 'message', listener: (message: ProviderMessage) => void): void;
  once(event: 'networkChanged', listener: (network: ProviderNetwork) => void): void;
  once(event: 'accountChanged', listener: (account: ProviderAccount) => void): void;

  request<R = any, P = any>(args: RequestArguments<P>): Promise<R>;
}
