import { Block } from '../types';

export const GET_BLOCK_METHOD = 'getBlock';

export interface GetBlockParams {
  blockheight: number;
  network?: string;
}

export type GetBlockResult = Block;
