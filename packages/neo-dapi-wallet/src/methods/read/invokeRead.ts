import { Argument, Signer } from '../../types';

export interface InvokeReadParams {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  signers?: Signer[];
  network?: string;
}

export interface InvokeReadResult {
  script: string;
  state: string;
  gasconsumed: string;
  stack: Argument[];
}
