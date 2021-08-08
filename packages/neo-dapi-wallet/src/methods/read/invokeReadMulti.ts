import { Argument, Signer } from '../../types';

interface Invoke {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}

interface Params {
  invokeArgs: Invoke[];
  signers?: Signer[];
  network?: string;
}

interface Result {
  script: string;
  state: string;
  gasConsumed: string;
  stack: Argument[];
}

export type InvokeReadMulti = (params: Params) => Promise<Result>;
