import { INeoProvider } from '@neongd/neo-provider';
import {
  GetAccount,
  GetApplicationLog,
  GetBalance,
  GetBlock,
  GetBlockCount,
  GetNetworks,
  GetProvider,
  GetPublicKey,
  GetStorage,
  GetTransaction,
  Invoke,
  InvokeMulti,
  InvokeRead,
  InvokeReadMulti,
} from './methods';
import { MethodName } from './types';

export class NeoDapiWallet {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  getProvider(): ReturnType<GetProvider> {
    return this.provider.request({ method: MethodName.GetProvider });
  }

  getAccount(): ReturnType<GetAccount> {
    return this.provider.request({ method: MethodName.GetAccount });
  }

  getPublicKey(): ReturnType<GetPublicKey> {
    return this.provider.request({ method: MethodName.GetPublicKey });
  }

  getNetworks(): ReturnType<GetNetworks> {
    return this.provider.request({ method: MethodName.GetNetworks });
  }

  getBalance(params: Parameters<GetBalance>): ReturnType<GetBalance> {
    return this.provider.request({ method: MethodName.GetBalance, params });
  }

  getBlockCount(params: Parameters<GetBlockCount>): ReturnType<GetBlockCount> {
    return this.provider.request({ method: MethodName.GetBlockCount, params });
  }

  getBlock(params: Parameters<GetBlock>): ReturnType<GetBlock> {
    return this.provider.request({ method: MethodName.GetBlock, params });
  }

  getTransaction(params: Parameters<GetTransaction>): ReturnType<GetTransaction> {
    return this.provider.request({ method: MethodName.GetTransaction, params });
  }

  getApplicationLog(params: Parameters<GetApplicationLog>): ReturnType<GetApplicationLog> {
    return this.provider.request({ method: MethodName.GetApplicationLog, params });
  }

  getStorage(params: Parameters<GetStorage>): ReturnType<GetStorage> {
    return this.provider.request({ method: MethodName.GetStorage, params });
  }

  invokeRead(params: Parameters<InvokeRead>): ReturnType<InvokeRead> {
    return this.provider.request({ method: MethodName.InvokeRead, params });
  }

  invokeReadMulti(params: Parameters<InvokeReadMulti>): ReturnType<InvokeReadMulti> {
    return this.provider.request({ method: MethodName.InvokeReadMulti, params });
  }

  invoke(params: Parameters<Invoke>): ReturnType<Invoke> {
    return this.provider.request({ method: MethodName.Invoke, params });
  }

  invokeMulti(params: Parameters<InvokeMulti>): ReturnType<InvokeMulti> {
    return this.provider.request({ method: MethodName.InvokeMulti, params });
  }
}
