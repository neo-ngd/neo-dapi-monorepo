import { INeoProvider, JsonRpcNeoProvider } from '@neongd/neo-provider';
import { MethodName } from './enums';
import {
  GetAccountResult,
  GetApplicationLogParams,
  GetApplicationLogResult,
  GetBalanceParams,
  GetBalanceResult,
  GetBlockCountParams,
  GetBlockCountResult,
  GetBlockParams,
  GetBlockResult,
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
  protected provider: INeoProvider;

  constructor(provider: INeoProvider | string) {
    if (typeof provider === 'string') {
      this.provider = new JsonRpcNeoProvider(provider);
    } else {
      this.provider = provider;
    }
  }

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

  getBalance(params: GetBalanceParams): Promise<GetBalanceResult> {
    return this.provider.request({ method: MethodName.GetBalance, params });
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
