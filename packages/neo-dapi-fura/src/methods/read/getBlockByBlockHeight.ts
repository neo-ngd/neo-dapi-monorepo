import { Block } from '../../types';

interface Params {
  BlockHeight: number;
}

type Result = Block;

export type GetBlockByBlockHeight = (params: Params) => Promise<Result>;
