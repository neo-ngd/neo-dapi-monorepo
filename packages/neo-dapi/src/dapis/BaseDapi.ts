import { Provider } from '../providers/Provider';
import { Expand } from '../utils/typeUtils';
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

  getProvider(): Promise<Expand<GetProviderResult>> {
    return this.provider.request({ method: 'getProvider' });
  }

  getNetworks(): Promise<Expand<GetNetworksResult>> {
    return this.provider.request({ method: 'getNetworks' });
  }

  getAccount(): Promise<Expand<GetAccountResult>> {
    return this.provider.request({ method: 'getAccount' });
  }

  getBlockCount(params: Expand<GetBlockCountParams>): Promise<Expand<GetBlockCountResult>> {
    return this.networkProvier.request({ method: 'getBlockCount', params });
  }

  getBlock(params: Expand<GetBlockParams>): Promise<Expand<GetBlockResult>> {
    return this.networkProvier.request({ method: 'getBlock', params });
  }

  getTransaction(params: Expand<GetTransactionParams>): Promise<Expand<GetTransactionResult>> {
    return this.networkProvier.request({ method: 'getTransaction', params });
  }

  getApplicationLog(
    params: Expand<GetApplicationLogParams>,
  ): Promise<Expand<GetApplicationLogResult>> {
    return this.networkProvier.request({ method: 'getApplicationLog', params });
  }

  getNep17Balances(
    params: Expand<GetNep17BalancesParams>,
  ): Promise<Expand<GetNep17BalancesResult>> {
    return this.networkProvier.request({ method: 'getNep17Balances', params });
  }

  invokeRead(params: Expand<InvokeReadParams>): Promise<Expand<InvokeReadResult>> {
    return this.networkProvier.request({ method: 'invokeRead', params });
  }

  invokeReadMulti(params: Expand<InvokeReadMultiParams>): Promise<Expand<InvokeReadMultiResult>> {
    return this.networkProvier.request({ method: 'invokeReadMulti', params });
  }

  invoke(params: Expand<InvokeParams>): Promise<Expand<InvokeResult>> {
    return this.provider.request({ method: 'invoke', params });
  }

  invokeMulti(params: Expand<InvokeMultiParams>): Promise<Expand<InvokeMultiResult>> {
    return this.provider.request({ method: 'invokeMulti', params });
  }

  signMessage(params: Expand<SignMessageParams>): Promise<Expand<SignMessageResult>> {
    return this.provider.request({ method: 'signMessage', params });
  }

  signMessageWithoutSalt(
    params: Expand<SignMessageWithoutSaltParams>,
  ): Promise<Expand<SignMessageWithoutSaltResult>> {
    return this.provider.request({ method: 'signMessageWithoutSalt', params });
  }

  signTransaction(params: Expand<SignTransactionParams>): Promise<Expand<SignTransactionResult>> {
    return this.provider.request({ method: 'signTransaction', params });
  }

  broadcastTransaction(
    params: Expand<BroadcastTransactionParams>,
  ): Promise<Expand<BroadcastTransactionResult>> {
    return this.networkProvier.request({ method: 'broadcastTransaction', params });
  }
}
