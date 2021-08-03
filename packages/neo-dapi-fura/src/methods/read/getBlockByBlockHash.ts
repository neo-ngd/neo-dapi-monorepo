import { Block } from '../types';

export const GET_BLOCK_BY_BLOCK_HASH_METHOD = 'GetBlockByBlockHash';

export interface GetBlockByBlockHashParams {
  BlockHash: number;
}

export type GetBlockByBlockHashResult = Block;
