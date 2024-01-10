import { Provider } from '../providers/Provider';
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
} from './Dapi';

export class BaseDapi implements Dapi {
  constructor(protected provider: Provider, protected networkProvier = provider) {}

  getProvider(): Promise<ProviderInformation> {
    return this.provider.request({ method: 'getProvider' });
  }

  getNetworks(): Promise<Networks> {
    return this.provider.request({ method: 'getNetworks' });
  }

  getAccount(): Promise<Account> {
    return this.provider.request({ method: 'getAccount' });
  }

  getBlockCount(params: { network?: string }): Promise<number> {
    return this.networkProvier.request({ method: 'getBlockCount', params });
  }

  getBlock(params: { blockIndex: number; network?: string }): Promise<Block> {
    return this.networkProvier.request({ method: 'getBlock', params });
  }

  getTransaction(params: { txid: string; network?: string }): Promise<Transaction> {
    return this.networkProvier.request({ method: 'getTransaction', params });
  }

  getApplicationLog(params: { txid: string; network?: string }): Promise<ApplicationLog> {
    return this.networkProvier.request({ method: 'getApplicationLog', params });
  }

  getNep17Balances(params: { address: string; network?: string }): Promise<Nep17Balance[]> {
    return this.networkProvier.request({ method: 'getNep17Balances', params });
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
    return this.networkProvier.request({ method: 'invokeRead', params });
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
    return this.networkProvier.request({ method: 'invokeReadMulti', params });
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
    return this.provider.request({ method: 'invoke', params });
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
    return this.provider.request({ method: 'invokeMulti', params });
  }

  signMessage(params: {
    message: string;
  }): Promise<{ salt: string; signature: string; publicKey: string }> {
    return this.provider.request({ method: 'signMessage', params });
  }

  signMessageWithoutSalt(params: {
    message: string;
  }): Promise<{ signature: string; publicKey: string }> {
    return this.provider.request({ method: 'signMessageWithoutSalt', params });
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
    return this.provider.request({ method: 'signTransaction', params });
  }

  broadcastTransaction(params: { signedTx: string; network?: string }): Promise<{
    txid: string;
    nodeUrl: string;
  }> {
    return this.networkProvier.request({ method: 'broadcastTransaction', params });
  }
}
