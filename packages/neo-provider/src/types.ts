export interface EventDispatcher {
  on(event: string, listener: any): void;
  removeListener(event: string, listener: any): void;
}

export interface ProviderRpcError extends Error {
  code: number;
  data?: any;
}

export interface ProviderMessage {
  type: string;
  data?: any;
}

export interface RequestArguments<T = any> {
  method: string;
  params?: T;
}

export interface Provider extends EventDispatcher {
  on(event: 'connect', listener: () => void): void;
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  on(event: 'message', listener: (message: ProviderMessage) => void): void;
  on(event: 'networkChanged', listener: (network: string) => void): void;
  on(event: 'accountChanged', listener: (account: string) => void): void;

  request<R = any, P = any>(args: RequestArguments<P>): Promise<R>;
}
