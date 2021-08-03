import { Argument } from '../../types';

export interface GetApplicationLogParams {
  txid: string;
  network?: string;
}

interface ExecutionDetails {
  trigger: string;
  vmstate: string;
  gasconsumed: string;
  stack: Argument[];
  notifications: Notification[];
}

interface Notification {
  contract: string;
  eventname: string;
  state: {
    type: 'Array';
    value: Argument[];
  };
}

export interface GetApplicationLogResult {
  txid: string;
  blockindex: number;
  executions: ExecutionDetails[];
}
