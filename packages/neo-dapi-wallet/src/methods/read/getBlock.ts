import { Block } from '../../types';

export interface GetBlockParams {
  blockIndex: number;
  network?: string;
}

export type GetBlockResult = Block;
