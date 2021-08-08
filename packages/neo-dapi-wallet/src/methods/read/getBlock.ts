import { Block } from '../../types';

interface Params {
  blockIndex: number;
  network?: string;
}

type Result = Block;

export type GetBlock = (params: Params) => Promise<Result>;
