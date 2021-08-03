import { Argument, Signer } from '../types';

export const INVOKE_READ_MULTI_METHOD = 'invokeReadMulti';

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
  gasconsumed: string;
  stack: Argument[];
}
