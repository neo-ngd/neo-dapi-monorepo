import { INeoProvider } from '@neongd/neo-provider';
import {
  GetBlockByBlockHashParams,
  GetBlockByBlockHashResult,
  GetBlockByBlockHeightParams,
  GetBlockByBlockHeightResult,
  GetBlockCountResult,
} from './methods';
import { MethodName } from './types';

export class NeoDapiFura {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  async getBlockCount(): Promise<GetBlockCountResult> {
    return this.provider.request({ method: MethodName.GetBlockCount });
  }

  async getBlockByBlockHeight(
    params: GetBlockByBlockHeightParams,
  ): Promise<GetBlockByBlockHeightResult> {
    return this.provider.request({ method: MethodName.GetBlockByBlockHeight, params });
  }

  async getBlockByBlockHash(params: GetBlockByBlockHashParams): Promise<GetBlockByBlockHashResult> {
    return this.provider.request({ method: MethodName.GetBlockByBlockHash, params });
  }
}
