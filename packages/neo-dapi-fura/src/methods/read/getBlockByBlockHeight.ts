import { Block } from '../types';

export const GET_BLOCK_BY_BLOCK_HEIGHT_METHOD = 'GetBlockByBlockHeight';

export interface GetBlockByBlockHeightParams {
  BlockHeight: number;
}

export type GetBlockByBlockHeightResult = Block;
