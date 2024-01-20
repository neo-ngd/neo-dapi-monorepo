import {
  Account,
  ApplicationLog,
  Argument,
  Attribute,
  Block,
  Invocation,
  Nep17Balance,
  Networks,
  ProviderInformation,
  Signer,
  Transaction,
} from '../utils/types';

export type GetProviderResult = ProviderInformation;

export type GetNetworksResult = Networks;

export type GetAccountResult = Account;

export interface GetBlockCountParams {
  network?: string;
}

export type GetBlockCountResult = number;

export interface GetBlockParams {
  blockIndex: number;
  network?: string;
}

export type GetBlockResult = Block;

export interface GetTransactionParams {
  txid: string;
  network?: string;
}

export type GetTransactionResult = Transaction;

export interface GetApplicationLogParams {
  txid: string;
  network?: string;
}

export type GetApplicationLogResult = ApplicationLog;

export interface GetNep17BalancesParams {
  address: string;
  network?: string;
}

export type GetNep17BalancesResult = Nep17Balance[];

export interface InvokeReadParams {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  signers?: Signer[];
  network?: string;
}

export interface InvokeReadResult {
  script: string;
  state: string;
  exception: string | null;
  gasConsumed: string;
  stack: Argument[];
}

export interface InvokeReadMultiParams {
  invocations: Invocation[];
  signers?: Signer[];
  network?: string;
}

export interface InvokeReadMultiResult {
  script: string;
  state: string;
  exception: string | null;
  gasConsumed: string;
  stack: Argument[];
}

export interface InvokeParams {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  attributes?: Attribute[];
  signers?: Signer[];
  network?: string;
  extraSystemFee?: string;
  extraNetworkFee?: string;
  broadcastOverride?: boolean;
}

export interface InvokeResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}

export interface InvokeMultiParams {
  invocations: Invocation[];
  attributes?: Attribute[];
  signers?: Signer[];
  network?: string;
  extraSystemFee?: string;
  extraNetworkFee?: string;
  broadcastOverride?: boolean;
}

export interface InvokeMultiResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}

export interface SignMessageParams {
  message: string;
}

export interface SignMessageResult {
  salt: string;
  signature: string;
  publicKey: string;
}

export interface SignMessageWithoutSaltParams {
  message: string;
}

export interface SignMessageWithoutSaltResult {
  signature: string;
  publicKey: string;
}

export interface SignTransactionParams {
  version: number;
  nonce: number;
  systemFee: string;
  networkFee: string;
  validUntilBlock: number;
  script: string;
  invocations?: Invocation[];
  attributes?: Attribute[];
  signers?: Signer[];
  network?: string;
}

export interface SignTransactionResult {
  signature: string;
  publicKey: string;
}

export interface BroadcastTransactionParams {
  signedTx: string;
  network?: string;
}

export interface BroadcastTransactionResult {
  txid: string;
  nodeUrl: string;
}

export interface Dapi {
  getProvider(): Promise<GetProviderResult>;

  getNetworks(): Promise<GetNetworksResult>;

  getAccount(): Promise<GetAccountResult>;

  getBlockCount(params: GetBlockCountParams): Promise<GetBlockCountResult>;

  getBlock(params: GetBlockParams): Promise<GetBlockResult>;

  getTransaction(params: GetTransactionParams): Promise<GetTransactionResult>;

  getApplicationLog(params: GetApplicationLogParams): Promise<GetApplicationLogResult>;

  getNep17Balances(params: GetNep17BalancesParams): Promise<GetNep17BalancesResult>;

  invokeRead(params: InvokeReadParams): Promise<InvokeReadResult>;

  invokeReadMulti(params: InvokeReadMultiParams): Promise<InvokeReadMultiResult>;

  invoke(params: InvokeParams): Promise<InvokeResult>;

  invokeMulti(params: InvokeMultiParams): Promise<InvokeMultiResult>;

  signMessage(params: SignMessageParams): Promise<SignMessageResult>;

  signMessageWithoutSalt(
    params: SignMessageWithoutSaltParams,
  ): Promise<SignMessageWithoutSaltResult>;

  signTransaction(params: SignTransactionParams): Promise<SignTransactionResult>;

  broadcastTransaction(params: BroadcastTransactionParams): Promise<BroadcastTransactionResult>;
}
