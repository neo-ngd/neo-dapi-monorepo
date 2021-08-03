import { INeoProvider } from '@neongd/neo-provider';
import {
  GET_BLOCK_BY_BLOCK_HASH_METHOD,
  GET_BLOCK_BY_BLOCK_HEIGHT_METHOD,
  GET_BLOCK_COUNT_METHOD,
  GetBlockByBlockHashParams,
  GetBlockByBlockHashResult,
  GetBlockByBlockHeightParams,
  GetBlockByBlockHeightResult,
  GetBlockCountResult,
} from './methods';

export class NeoDapiFura {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  async getBlockCount(): Promise<GetBlockCountResult> {
    return this.provider.request({ method: GET_BLOCK_COUNT_METHOD });
  }

  async getBlockByBlockHeight(
    params: GetBlockByBlockHeightParams,
  ): Promise<GetBlockByBlockHeightResult> {
    return this.provider.request({ method: GET_BLOCK_BY_BLOCK_HEIGHT_METHOD, params });
  }

  async getBlockByBlockHash(params: GetBlockByBlockHashParams): Promise<GetBlockByBlockHashResult> {
    return this.provider.request({ method: GET_BLOCK_BY_BLOCK_HASH_METHOD, params });
  }
}
