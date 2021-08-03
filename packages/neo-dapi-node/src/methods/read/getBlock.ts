import { Block } from '../types';

export const GET_BLOCK_METHOD = 'getblock';

export type GetBlockParams = [number] | [number, boolean] | [string] | [string, boolean];

export type GetBlockResult = string | Block;
