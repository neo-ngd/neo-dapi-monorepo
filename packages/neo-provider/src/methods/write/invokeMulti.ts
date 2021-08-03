import { Argument, Signer, TransactionAttribute } from '../types';

export const INVOKE_MULTI_METHOD = 'invokeMulti';

interface Invoke {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}

export interface InvokeMultiParams {
  invokeArgs: Invoke[];
  attrs?: TransactionAttribute[];
  signers?: Signer[];
  network?: string;
  fee?: string;
  broadcastOverride?: boolean;
}

export interface InvokeMultiResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}
