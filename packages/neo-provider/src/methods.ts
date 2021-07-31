export const GET_PROVIDER_METHOD = 'getProvider';

export interface GetProviderResult {
  name: string;
  version: string;
}

export const GET_NETWORKS_METHOD = 'getNetworks';

export interface GetNetworksResult {
  networks: string[];
  defaultNetwork: string;
}

export const GET_ACCOUNT_METHOD = 'getAccount';

export interface GetAccountResult {
  address: string;
  label?: string;
}

export const GET_PUBLIC_KEY_METHOD = 'getPublicKey';

export interface GetPublicKeyResult {
  address: string;
  publicKey: string;
}

export const GET_BALANCE_METHOD = 'getBalance';

interface BalanceRequest {
  address: string;
  contracts?: string[];
}

export interface GetBalanceParams {
  params: BalanceRequest | BalanceRequest[];
  network?: string;
}

interface Balance {
  contract: string;
  symbol: string;
  amount: string;
}

export interface GetBalanceResult {
  [address: string]: Balance[];
}

export const GET_STORAGE_METHOD = 'getStorage';

export interface GetStorageParams {
  scriptHash: string;
  key: string;
  network?: string;
}

export interface GetStorageResult {
  result: string;
}

export const INVOKE_READ_METHOD = 'invokeRead';

export enum ArgumentDataType {
  STRING = 'String',
  BOOLEAN = 'Boolean',
  HASH160 = 'Hash160',
  HASH256 = 'Hash256',
  INTEGER = 'Integer',
  BYTEARRAY = 'ByteArray',
  ARRAY = 'Array',
  ADDRESS = 'Address',
}

interface Argument {
  type: ArgumentDataType;
  value: any;
}

interface Signer {
  account: string;
  scopes: string;
  allowedcontracts?: string[];
  allowedgroups?: string[];
}

export interface InvokeReadParams {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  signers?: Signer[];
  network?: string;
}
