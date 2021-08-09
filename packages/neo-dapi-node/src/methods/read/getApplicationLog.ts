import { Argument } from '../../types';

type Params = [txid: string];

interface ExecutionDetails {
  trigger: string;
  vmstate: string;
  exception: string | null;
  gasconsumed: string;
  stack: Argument[];
  notifications: Notification[];
}

interface Notification {
  contract: string;
  eventname: string;
  state: Argument;
}

interface Result {
  txid: string;
  executions: ExecutionDetails[];
}

export type GetApplicationLog = (...params: Params) => Promise<Result>;
