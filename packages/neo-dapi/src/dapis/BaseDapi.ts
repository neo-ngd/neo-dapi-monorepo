import { Provider } from '../providers/Provider';
import {
  BroadcastTransactionParams,
  BroadcastTransactionResult,
  Dapi,
  GetAccountResult,
  GetApplicationLogParams,
  GetApplicationLogResult,
  GetBlockCountParams,
  GetBlockCountResult,
  GetBlockParams,
  GetBlockResult,
  GetNep17BalancesParams,
  GetNep17BalancesResult,
  GetNetworksResult,
  GetProviderResult,
  GetTransactionParams,
  GetTransactionResult,
  InvokeMultiParams,
  InvokeMultiResult,
  InvokeParams,
  InvokeReadMultiParams,
  InvokeReadMultiResult,
  InvokeReadParams,
  InvokeReadResult,
  InvokeResult,
  SignMessageParams,
  SignMessageResult,
  SignMessageWithoutSaltParams,
  SignMessageWithoutSaltResult,
  SignTransactionParams,
  SignTransactionResult,
} from './Dapi';

export class BaseDapi implements Dapi {
  constructor(protected provider: Provider, protected networkProvier = provider) {}

  getProvider(): Promise<GetProviderResult> {
    return this.provider.request({ method: 'getProvider' });
  }

  getNetworks(): Promise<GetNetworksResult> {
    return this.provider.request({ method: 'getNetworks' });
  }

  getAccount(): Promise<GetAccountResult> {
    return this.provider.request({ method: 'getAccount' });
  }

  getBlockCount(params: GetBlockCountParams): Promise<GetBlockCountResult> {
    return this.networkProvier.request({ method: 'getBlockCount', params });
  }

  getBlock(params: GetBlockParams): Promise<GetBlockResult> {
    return this.networkProvier.request({ method: 'getBlock', params });
  }

  getTransaction(params: GetTransactionParams): Promise<GetTransactionResult> {
    return this.networkProvier.request({ method: 'getTransaction', params });
  }

  getApplicationLog(params: GetApplicationLogParams): Promise<GetApplicationLogResult> {
    return this.networkProvier.request({ method: 'getApplicationLog', params });
  }

  getNep17Balances(params: GetNep17BalancesParams): Promise<GetNep17BalancesResult> {
    return this.networkProvier.request({ method: 'getNep17Balances', params });
  }

  invokeRead(params: InvokeReadParams): Promise<InvokeReadResult> {
    return this.networkProvier.request({ method: 'invokeRead', params });
  }

  invokeReadMulti(params: InvokeReadMultiParams): Promise<InvokeReadMultiResult> {
    return this.networkProvier.request({ method: 'invokeReadMulti', params });
  }

  invoke(params: InvokeParams): Promise<InvokeResult> {
    return this.provider.request({ method: 'invoke', params });
  }

  invokeMulti(params: InvokeMultiParams): Promise<InvokeMultiResult> {
    return this.provider.request({ method: 'invokeMulti', params });
  }

  signMessage(params: SignMessageParams): Promise<SignMessageResult> {
    return this.provider.request({ method: 'signMessage', params });
  }

  signMessageWithoutSalt(
    params: SignMessageWithoutSaltParams,
  ): Promise<SignMessageWithoutSaltResult> {
    return this.provider.request({ method: 'signMessageWithoutSalt', params });
  }

  signTransaction(params: SignTransactionParams): Promise<SignTransactionResult> {
    return this.provider.request({ method: 'signTransaction', params });
  }

  broadcastTransaction(params: BroadcastTransactionParams): Promise<BroadcastTransactionResult> {
    return this.networkProvier.request({ method: 'broadcastTransaction', params });
  }
}
