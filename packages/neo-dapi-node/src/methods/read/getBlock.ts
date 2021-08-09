import { Block } from '../../types';

type Params = [index: number, verbose?: boolean] | [hash: string, verbose?: boolean];

type Result = string | Block;

export type GetBlock = (...params: Params) => Promise<Result>;
