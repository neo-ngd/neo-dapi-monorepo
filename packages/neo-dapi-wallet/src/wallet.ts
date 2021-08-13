import { INeoProvider } from '@neongd/neo-provider';
import { MethodName } from './enums';
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

export class NeoDapiWallet {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider): void {
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

  getBalance(params: Parameters<GetBalance>[0]): ReturnType<GetBalance> {
    return this.provider.request({ method: MethodName.GetBalance, params });
  }

  getBlockCount(params: Parameters<GetBlockCount>[0]): ReturnType<GetBlockCount> {
    return this.provider.request({ method: MethodName.GetBlockCount, params });
  }

  getBlock(params: Parameters<GetBlock>[0]): ReturnType<GetBlock> {
    return this.provider.request({ method: MethodName.GetBlock, params });
  }

  getTransaction(params: Parameters<GetTransaction>[0]): ReturnType<GetTransaction> {
    return this.provider.request({ method: MethodName.GetTransaction, params });
  }

  getApplicationLog(params: Parameters<GetApplicationLog>[0]): ReturnType<GetApplicationLog> {
    return this.provider.request({ method: MethodName.GetApplicationLog, params });
  }

  getStorage(params: Parameters<GetStorage>[0]): ReturnType<GetStorage> {
    return this.provider.request({ method: MethodName.GetStorage, params });
  }

  invokeRead(params: Parameters<InvokeRead>[0]): ReturnType<InvokeRead> {
    return this.provider.request({ method: MethodName.InvokeRead, params });
  }

  invokeReadMulti(params: Parameters<InvokeReadMulti>[0]): ReturnType<InvokeReadMulti> {
    return this.provider.request({ method: MethodName.InvokeReadMulti, params });
  }

  invoke(params: Parameters<Invoke>[0]): ReturnType<Invoke> {
    return this.provider.request({ method: MethodName.Invoke, params });
  }

  invokeMulti(params: Parameters<InvokeMulti>[0]): ReturnType<InvokeMulti> {
    return this.provider.request({ method: MethodName.InvokeMulti, params });
  }
}
