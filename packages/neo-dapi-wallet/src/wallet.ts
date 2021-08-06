import { INeoProvider } from '@neongd/neo-provider';
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
  InvokeMultiParams,
  InvokeMultiResult,
  InvokeParams,
  InvokeReadMultiParams,
  InvokeReadMultiResult,
  InvokeReadParams,
  InvokeReadResult,
  InvokeResult,
} from './methods';
import { MethodName } from './types';

export class NeoDapiWallet {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  async getProvider(): Promise<GetProviderResult> {
    return this.provider.request({ method: MethodName.GetProvider });
  }

  async getAccount(): Promise<GetAccountResult> {
    return this.provider.request({ method: MethodName.GetAccount });
  }

  async getPublicKey(): Promise<GetPublicKeyResult> {
    return this.provider.request({ method: MethodName.GetPublicKey });
  }

  async getNetworks(): Promise<GetNetworksResult> {
    return this.provider.request({ method: MethodName.GetNetworks });
  }

  async getBalance(params: GetBalanceParams): Promise<GetBalanceResult> {
    return this.provider.request({ method: MethodName.GetBalance, params });
  }

  async getBlockCount(params: GetBlockCountParams): Promise<GetBlockCountResult> {
    return this.provider.request({ method: MethodName.GetBlockCount, params });
  }

  async getBlock(params: GetBlockParams): Promise<GetBlockResult> {
    return this.provider.request({ method: MethodName.GetBlock, params });
  }

  async getTransaction(params: GetTransactionParams): Promise<GetTransactionResult> {
    return this.provider.request({ method: MethodName.GetTransaction, params });
  }

  async getApplicationLog(params: GetApplicationLogParams): Promise<GetApplicationLogResult> {
    return this.provider.request({ method: MethodName.GetApplicationLog, params });
  }

  async getStorage(params: GetStorageParams): Promise<GetStorageResult> {
    return this.provider.request({ method: MethodName.GetStorage, params });
  }

  async invokeRead(params: InvokeReadParams): Promise<InvokeReadResult> {
    return this.provider.request({ method: MethodName.InvokeRead, params });
  }

  async invokeReadMulti(params: InvokeReadMultiParams): Promise<InvokeReadMultiResult> {
    return this.provider.request({ method: MethodName.InvokeReadMulti, params });
  }

  async invoke(params: InvokeParams): Promise<InvokeResult> {
    return this.provider.request({ method: MethodName.Invoke, params });
  }

  async invokeMulti(params: InvokeMultiParams): Promise<InvokeMultiResult> {
    return this.provider.request({ method: MethodName.InvokeMulti, params });
  }
}
