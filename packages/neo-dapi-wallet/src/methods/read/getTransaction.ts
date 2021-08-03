import { Transaction } from '../types';

export const GET_TRANSACTION_METHOD = 'getTransaction';

export interface GetTransactionParams {
  txid: string;
  network?: string;
}

export type GetTransactionResult = Transaction;
