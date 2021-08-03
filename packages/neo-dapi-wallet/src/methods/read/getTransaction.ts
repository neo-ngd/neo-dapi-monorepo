import { Transaction } from '../../types';

export interface GetTransactionParams {
  txid: string;
  network?: string;
}

export type GetTransactionResult = Transaction;
