import { Block } from '../../types';

type Params = [number] | [number, boolean] | [string] | [string, boolean];

type Result = string | Block;

export type GetBlock = (...params: Params) => Promise<Result>;
