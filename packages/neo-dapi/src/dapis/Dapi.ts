import { Expand } from '../utils/typeUtils';
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
  getProvider(): Promise<Expand<GetProviderResult>>;

  getNetworks(): Promise<Expand<GetNetworksResult>>;

  getAccount(): Promise<Expand<GetAccountResult>>;

  getBlockCount(params: Expand<GetBlockCountParams>): Promise<Expand<GetBlockCountResult>>;

  getBlock(params: Expand<GetBlockParams>): Promise<Expand<GetBlockResult>>;

  getTransaction(params: Expand<GetTransactionParams>): Promise<Expand<GetTransactionResult>>;

  getApplicationLog(
    params: Expand<GetApplicationLogParams>,
  ): Promise<Expand<GetApplicationLogResult>>;

  getNep17Balances(params: Expand<GetNep17BalancesParams>): Promise<Expand<GetNep17BalancesResult>>;

  invokeRead(params: Expand<InvokeReadParams>): Promise<Expand<InvokeReadResult>>;

  invokeReadMulti(params: Expand<InvokeReadMultiParams>): Promise<Expand<InvokeReadMultiResult>>;

  invoke(params: Expand<InvokeParams>): Promise<Expand<InvokeResult>>;

  invokeMulti(params: Expand<InvokeMultiParams>): Promise<Expand<InvokeMultiResult>>;

  signMessage(params: Expand<SignMessageParams>): Promise<Expand<SignMessageResult>>;

  signMessageWithoutSalt(
    params: Expand<SignMessageWithoutSaltParams>,
  ): Promise<Expand<SignMessageWithoutSaltResult>>;

  signTransaction(params: Expand<SignTransactionParams>): Promise<Expand<SignTransactionResult>>;

  broadcastTransaction(
    params: Expand<BroadcastTransactionParams>,
  ): Promise<Expand<BroadcastTransactionResult>>;
}
