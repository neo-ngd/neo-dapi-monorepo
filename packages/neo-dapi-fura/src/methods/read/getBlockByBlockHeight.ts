import { Block } from '../../types';

export interface GetBlockByBlockHeightParams {
  BlockHeight: number;
}

export type GetBlockByBlockHeightResult = Block;
