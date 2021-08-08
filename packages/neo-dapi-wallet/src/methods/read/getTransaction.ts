import { Transaction } from '../../types';

interface Params {
  txid: string;
  network?: string;
}

type Result = Transaction;

export type GetTransaction = (params: Params) => Promise<Result>;
