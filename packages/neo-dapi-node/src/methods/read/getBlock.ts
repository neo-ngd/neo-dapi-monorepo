import { Block } from '../../types';

export type GetBlockParams = [number] | [number, boolean] | [string] | [string, boolean];

export type GetBlockResult = string | Block;
