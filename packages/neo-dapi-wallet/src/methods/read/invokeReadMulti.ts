import { Argument, Signer } from '../../types';

interface Invoke {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}

export interface InvokeReadMultiParams {
  invokeArgs: Invoke[];
  signers?: Signer[];
  network?: string;
}

export interface InvokeReadMultiResult {
  script: string;
  state: string;
  gasConsumed: string;
  stack: Argument[];
}
