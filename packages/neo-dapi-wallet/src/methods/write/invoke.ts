import { Argument, Signer, TransactionAttribute } from '../../types';

interface Params {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  attrs?: TransactionAttribute[];
  signers?: Signer[];
  network?: string;
  fee?: string;
  broadcastOverride?: boolean;
}

interface Result {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}

export type Invoke = (params: Params) => Promise<Result>;
