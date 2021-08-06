import { Argument } from '../../types';

export interface GetApplicationLogParams {
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
  state: {
    type: 'Array';
    value: Argument[];
  };
}

export interface GetApplicationLogResult {
  txid: string;
  blockIndex: number;
  executions: ExecutionDetails[];
}
