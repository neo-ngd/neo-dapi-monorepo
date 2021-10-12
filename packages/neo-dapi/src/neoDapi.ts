import { INeoProvider } from '@neongd/neo-provider';
import { MethodName } from './enums';
import {
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
  GetPublicKeyResult,
  GetStorageParams,
  GetStorageResult,
  GetTransactionParams,
  GetTransactionResult,
  INeoDapi,
  InvokeMultiParams,
  InvokeMultiResult,
  InvokeParams,
  InvokeReadMultiParams,
  InvokeReadMultiResult,
  InvokeReadParams,
  InvokeReadResult,
  InvokeResult,
} from './types';

export class NeoDapi implements INeoDapi {
  constructor(protected provider: INeoProvider) {}

  getProvider(): Promise<GetProviderResult> {
    return this.provider.request({ method: MethodName.GetProvider });
  }

  getAccount(): Promise<GetAccountResult> {
    return this.provider.request({ method: MethodName.GetAccount });
  }

  getPublicKey(): Promise<GetPublicKeyResult> {
    return this.provider.request({ method: MethodName.GetPublicKey });
  }

  getNetworks(): Promise<GetNetworksResult> {
    return this.provider.request({ method: MethodName.GetNetworks });
  }

  getNep17Balances(params: GetNep17BalancesParams): Promise<GetNep17BalancesResult> {
    return this.provider.request({ method: MethodName.GetNep17Balances, params });
  }

  getBlockCount(params: GetBlockCountParams): Promise<GetBlockCountResult> {
    return this.provider.request({ method: MethodName.GetBlockCount, params });
  }

  getBlock(params: GetBlockParams): Promise<GetBlockResult> {
    return this.provider.request({ method: MethodName.GetBlock, params });
  }

  getTransaction(params: GetTransactionParams): Promise<GetTransactionResult> {
    return this.provider.request({ method: MethodName.GetTransaction, params });
  }

  getApplicationLog(params: GetApplicationLogParams): Promise<GetApplicationLogResult> {
    return this.provider.request({ method: MethodName.GetApplicationLog, params });
  }

  getStorage(params: GetStorageParams): Promise<GetStorageResult> {
    return this.provider.request({ method: MethodName.GetStorage, params });
  }

  invokeRead(params: InvokeReadParams): Promise<InvokeReadResult> {
    return this.provider.request({ method: MethodName.InvokeRead, params });
  }

  invokeReadMulti(params: InvokeReadMultiParams): Promise<InvokeReadMultiResult> {
    return this.provider.request({ method: MethodName.InvokeReadMulti, params });
  }

  invoke(params: InvokeParams): Promise<InvokeResult> {
    return this.provider.request({ method: MethodName.Invoke, params });
  }

  invokeMulti(params: InvokeMultiParams): Promise<InvokeMultiResult> {
    return this.provider.request({ method: MethodName.InvokeMulti, params });
  }
}
