import { INeoProvider } from '@neongd/neo-provider';
import { GetBlockByBlockHash, GetBlockByBlockHeight, GetBlockCount } from './methods';
import { MethodName } from './types';

export class NeoDapiFura {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider): void {
    this.provider = provider;
  }

  getBlockCount(): ReturnType<GetBlockCount> {
    return this.provider.request({ method: MethodName.GetBlockCount });
  }

  getBlockByBlockHeight(
    params: Parameters<GetBlockByBlockHeight>[0],
  ): ReturnType<GetBlockByBlockHeight> {
    return this.provider.request({ method: MethodName.GetBlockByBlockHeight, params });
  }

  getBlockByBlockHash(params: Parameters<GetBlockByBlockHash>[0]): ReturnType<GetBlockByBlockHash> {
    return this.provider.request({ method: MethodName.GetBlockByBlockHash, params });
  }
}
