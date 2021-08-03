import { Block } from '../../types';

export interface GetBlockByBlockHashParams {
  BlockHash: number;
}

export type GetBlockByBlockHashResult = Block;
