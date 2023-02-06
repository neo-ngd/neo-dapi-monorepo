import { Provider } from '@neongd/neo-provider';
import { MethodName } from './enums';
import {
  Account,
  ApplicationLog,
  Argument,
  Attribute,
  Block,
  Dapi,
  Invocation,
  Nep17Balance,
  Networks,
  ProviderInformation,
  Signer,
  Transaction,
} from './types';

export class BaseDapi implements Dapi {
  constructor(protected provider: Provider) {}

  getProvider(): Promise<ProviderInformation> {
    return this.provider.request({ method: MethodName.GetProvider });
  }

  getNetworks(): Promise<Networks> {
    return this.provider.request({ method: MethodName.GetNetworks });
  }

  getAccount(): Promise<Account> {
    return this.provider.request({ method: MethodName.GetAccount });
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

  getNep17Balances(params: { address: string; network?: string }): Promise<Nep17Balance[]> {
    return this.provider.request({ method: MethodName.GetNep17Balances, params });
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

  signMessageWithoutSalt(params: {
    message: string;
  }): Promise<{ signature: string; publicKey: string }> {
    return this.provider.request({ method: MethodName.SignMessageWithoutSalt, params });
  }

  signTransaction(params: {
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
  }): Promise<{ signature: string; publicKey: string }> {
    return this.provider.request({ method: MethodName.SignTransaction, params });
  }

  relayTransaction(params: { signedTx: string; network?: string }): Promise<{
    txid: string;
    nodeUrl: string;
  }> {
    return this.provider.request({ method: MethodName.RelayTransaction, params });
  }
}
