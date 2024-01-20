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

export type GetProviderResult = Expand<ProviderInformation>;

export type GetNetworksResult = Expand<Networks>;

export type GetAccountResult = Expand<Account>;

export type GetBlockCountParams = Expand<{
  network?: string;
}>;

export type GetBlockCountResult = number;

export type GetBlockParams = Expand<{
  blockIndex: number;
  network?: string;
}>;

export type GetBlockResult = Expand<Block>;

export type GetTransactionParams = Expand<{
  txid: string;
  network?: string;
}>;

export type GetTransactionResult = Expand<Transaction>;

export type GetApplicationLogParams = Expand<{
  txid: string;
  network?: string;
}>;

export type GetApplicationLogResult = Expand<ApplicationLog>;

export type GetNep17BalancesParams = Expand<{
  address: string;
  network?: string;
}>;

export type GetNep17BalancesResult = Expand<Nep17Balance[]>;

export type InvokeReadParams = Expand<{
  scriptHash: string;
  operation: string;
  args?: Argument[];
  signers?: Signer[];
  network?: string;
}>;

export type InvokeReadResult = Expand<{
  script: string;
  state: string;
  exception: string | null;
  gasConsumed: string;
  stack: Argument[];
}>;

export type InvokeReadMultiParams = Expand<{
  invocations: Invocation[];
  signers?: Signer[];
  network?: string;
}>;

export type InvokeReadMultiResult = Expand<{
  script: string;
  state: string;
  exception: string | null;
  gasConsumed: string;
  stack: Argument[];
}>;

export type InvokeParams = Expand<{
  scriptHash: string;
  operation: string;
  args?: Argument[];
  attributes?: Attribute[];
  signers?: Signer[];
  network?: string;
  extraSystemFee?: string;
  extraNetworkFee?: string;
  broadcastOverride?: boolean;
}>;

export type InvokeResult = Expand<{
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}>;

export type InvokeMultiParams = Expand<{
  invocations: Invocation[];
  attributes?: Attribute[];
  signers?: Signer[];
  network?: string;
  extraSystemFee?: string;
  extraNetworkFee?: string;
  broadcastOverride?: boolean;
}>;

export type InvokeMultiResult = Expand<{
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}>;

export type SignMessageParams = Expand<{
  message: string;
}>;

export type SignMessageResult = Expand<{
  salt: string;
  signature: string;
  publicKey: string;
}>;

export type SignMessageWithoutSaltParams = Expand<{
  message: string;
}>;

export type SignMessageWithoutSaltResult = Expand<{
  signature: string;
  publicKey: string;
}>;

export type SignTransactionParams = Expand<{
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
}>;

export type SignTransactionResult = Expand<{
  signature: string;
  publicKey: string;
}>;

export type BroadcastTransactionParams = Expand<{
  signedTx: string;
  network?: string;
}>;

export type BroadcastTransactionResult = Expand<{
  txid: string;
  nodeUrl: string;
}>;

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
