import { Argument } from '../../types';

interface Params {
  txid: string;
  network?: string;
}

interface ExecutionDetails {
  trigger: string;
  vmState: string;
  gasConsumed: string;
  stack: Argument[];
  notifications: Notification[];
}

interface Notification {
  contract: string;
  eventName: string;
  state: Argument;
}

interface Result {
  txid: string;
  executions: ExecutionDetails[];
}

export type GetApplicationLog = (params: Params) => Promise<Result>;
