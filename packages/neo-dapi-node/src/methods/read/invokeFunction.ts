import { Argument, Signer } from '../../types';

type Params = [scriptHash: string, operation: string, params: Argument[], signers: Signer[]];

interface Result {
  script: string;
  state: string;
  exception: string | null;
  gasconsumed: string;
  stack: Argument[];
  tx: string | null;
}

export type InvokeFunction = (...params: Params) => Promise<Result>;
