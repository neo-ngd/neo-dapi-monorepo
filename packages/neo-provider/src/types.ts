export interface IEvents {
  on(event: string, listener: any): void;
  once(event: string, listener: any): void;
  off(event: string, listener: any): void;
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

export interface ProviderInfo {
  chainId: string;
}

export interface RequestArguments<T = any> {
  method: string;
  params?: T;
}

export type ProviderChainId = string;

export type ProviderAccounts = string[];

export type ProviderEvent =
  | 'connect'
  | 'disconnect'
  | 'message'
  | 'chainChanged'
  | 'accountsChanged';

export type ProviderListener =
  | ((info: ProviderInfo) => void)
  | ((error: ProviderRpcError) => void)
  | ((message: ProviderMessage) => void)
  | ((chainId: ProviderChainId) => void)
  | ((accounts: ProviderAccounts) => void);

export interface INeoProvider extends IEvents {
  enable(): Promise<ProviderAccounts>;

  on(event: 'connect', listener: (info: ProviderInfo) => void): void;
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  on(event: 'message', listener: (message: ProviderMessage) => void): void;
  on(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  on(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;

  once(event: 'connect', listener: (info: ProviderInfo) => void): void;
  once(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  once(event: 'message', listener: (message: ProviderMessage) => void): void;
  once(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  once(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;

  request<R = any, P = any>(args: RequestArguments<P>): Promise<R>;
}
