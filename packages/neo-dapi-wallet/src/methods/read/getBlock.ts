import { Block } from '../../types';

export interface GetBlockParams {
  blockheight: number;
  network?: string;
}

export type GetBlockResult = Block;
