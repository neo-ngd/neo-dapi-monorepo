import { INeoProvider } from '@neongd/neo-provider';
import { MethodName } from './enums';
import {
  Account,
  ApplicationLog,
  Argument,
  Attribute,
  Block,
  INeoDapi,
  Invocation,
  Nep17Balance,
  Networks,
  Provider,
  Signer,
  Transaction,
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

  getStorage(params: { scriptHash: string; key: string; network?: string }): Promise<string> {
    return this.provider.request({ method: MethodName.GetStorage, params });
  }

  invokeRead(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    signers?: Signer[];
    network?: string;
  }): Promise<{
    script: string;
    state: string;
    exception: string | null;
    gasConsumed: string;
    stack: Argument[];
  }> {
    return this.provider.request({ method: MethodName.InvokeRead, params });
  }

  invokeReadMulti(params: {
    invocations: Invocation[];
    signers?: Signer[];
    network?: string;
  }): Promise<{
    script: string;
    state: string;
    exception: string | null;
    gasConsumed: string;
    stack: Argument[];
  }> {
    return this.provider.request({ method: MethodName.InvokeReadMulti, params });
  }

  invoke(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    attributes?: Attribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<{
    txid: string;
    nodeUrl?: string;
    signedTx?: string;
  }> {
    return this.provider.request({ method: MethodName.Invoke, params });
  }

  invokeMulti(params: {
    invocations: Invocation[];
    attributes?: Attribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<{
    txid: string;
    nodeUrl?: string;
    signedTx?: string;
  }> {
    return this.provider.request({ method: MethodName.InvokeMulti, params });
  }

  signMessage(params: {
    message: string;
  }): Promise<{ salt: string; signature: string; publicKey: string }> {
    return this.provider.request({ method: MethodName.SignMessage, params });
  }

  verifyMessage(params: {
    message: string;
    salt: string;
    signature: string;
    publicKey: string;
  }): Promise<boolean> {
    return this.provider.request({ method: MethodName.VerifyMessage, params });
  }

  signTransation(params: {
    version: number;
    nounce: number;
    systemFee: string;
    networkFee: string;
    validUntilBlock: string;
    script: string;
    invocations?: Invocation[];
    attributes?: Attribute[];
    signers?: Signer[];
    network?: string;
  }): Promise<{ signature: string; publicKey: string }> {
    return this.provider.request({ method: MethodName.SignTransation, params });
  }

  relayTransaction(params: { signedTx: string; network?: string }): Promise<{
    txid: string;
    nodeUrl: string;
  }> {
    return this.provider.request({ method: MethodName.RelayTransation, params });
  }
}
