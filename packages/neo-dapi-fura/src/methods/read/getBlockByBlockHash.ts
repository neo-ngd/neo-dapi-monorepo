import { Block } from '../../types';

interface Params {
  BlockHash: string;
}

type Result = Block;

export type GetBlockByBlockHash = (params: Params) => Promise<Result>;
