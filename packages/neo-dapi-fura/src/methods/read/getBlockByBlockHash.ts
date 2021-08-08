import { Block } from '../../types';

interface Params {
  BlockHash: number;
}

type Result = Block;

export type GetBlockByBlockHash = (params: Params) => Promise<Result>;
