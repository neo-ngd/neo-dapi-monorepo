import { Transaction } from '../../types';

type Params = [txid: string, verbose?: boolean];

type Result = Transaction | string;

export type GetRawTransaction = (...params: Params) => Promise<Result>;
