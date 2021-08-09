import { Argument, Signer } from '../../types';

type Params = [script: string, signers: Signer[]];

interface Result {
  script: string;
  state: string;
  exception: string | null;
  gasconsumed: string;
  stack: Argument[];
  tx: string | null;
}

export type InvokeScript = (...params: Params) => Promise<Result>;
