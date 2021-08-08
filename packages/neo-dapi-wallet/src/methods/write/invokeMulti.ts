import { Argument, Signer, TransactionAttribute } from '../../types';

interface Invoke {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}

interface Params {
  invokeArgs: Invoke[];
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

export type InvokeMulti = (params: Params) => Promise<Result>;
