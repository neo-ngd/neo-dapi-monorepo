import { Argument, Signer, TransactionAttribute } from '../types';

export const INVOKE_METHOD = 'invoke';

export interface InvokeParams {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  attrs?: TransactionAttribute[];
  signers?: Signer[];
  network?: string;
  fee?: string;
  broadcastOverride?: boolean;
}

export interface InvokeResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}
