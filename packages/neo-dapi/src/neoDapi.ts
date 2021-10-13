import { INeoProvider } from '@neongd/neo-provider';
import { MethodName } from './enums';
import {
  Account,
  ApplicationLog,
  Argument,
  Block,
  INeoDapi,
  Invocation,
  InvokeReadResult,
  InvokeResult,
  Nep17Balance,
  Networks,
  Provider,
  Signer,
  Transaction,
  TransactionAttribute,
} from './types';

export class NeoDapi implements INeoDapi {
  constructor(protected provider: INeoProvider) {}

  getProvider(): Promise<Provider> {
    return this.provider.request({ method: MethodName.GetProvider });
  }

  getNetworks(): Promise<Networks> {
    return this.provider.request({ method: MethodName.GetNetworks });
  }

  getAccount(): Promise<Account> {
    return this.provider.request({ method: MethodName.GetAccount });
  }

  getNep17Balances(params: {
    address: string;
    assetHashes?: string[];
    network?: string;
  }): Promise<Nep17Balance[]> {
    return this.provider.request({ method: MethodName.GetNep17Balances, params });
  }

  getBlockCount(params: { network?: string }): Promise<number> {
    return this.provider.request({ method: MethodName.GetBlockCount, params });
  }

  getBlock(params: { blockIndex: number; network?: string }): Promise<Block> {
    return this.provider.request({ method: MethodName.GetBlock, params });
  }

  getTransaction(params: { txid: string; network?: string }): Promise<Transaction> {
    return this.provider.request({ method: MethodName.GetTransaction, params });
  }

  getApplicationLog(params: { txid: string; network?: string }): Promise<ApplicationLog> {
    return this.provider.request({ method: MethodName.GetApplicationLog, params });
  }

  getStorage(params: { scriptHash: string; key: string; network?: string }): Promise<Storage> {
    return this.provider.request({ method: MethodName.GetStorage, params });
  }

  invokeRead(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    signers?: Signer[];
    network?: string;
  }): Promise<InvokeReadResult> {
    return this.provider.request({ method: MethodName.InvokeRead, params });
  }

  invokeReadMulti(params: {
    invokeArgs: Invocation[];
    signers?: Signer[];
    network?: string;
  }): Promise<InvokeReadResult> {
    return this.provider.request({ method: MethodName.InvokeReadMulti, params });
  }

  invoke(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    attrs?: TransactionAttribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<InvokeResult> {
    return this.provider.request({ method: MethodName.Invoke, params });
  }

  invokeMulti(params: {
    invokeArgs: Invocation[];
    attrs?: TransactionAttribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<InvokeResult> {
    return this.provider.request({ method: MethodName.InvokeMulti, params });
  }
}
