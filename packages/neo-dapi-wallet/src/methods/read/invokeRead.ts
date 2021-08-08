import { Argument, Signer } from '../../types';

interface Params {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  signers?: Signer[];
  network?: string;
}

interface Result {
  script: string;
  state: string;
  gasConsumed: string;
  stack: Argument[];
}

export type InvokeRead = (params: Params) => Promise<Result>;
