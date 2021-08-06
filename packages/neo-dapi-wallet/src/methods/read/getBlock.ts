import { Block } from '../../types';

export interface GetBlockParams {
  blockHeight: number;
  network?: string;
}

export type GetBlockResult = Block;
