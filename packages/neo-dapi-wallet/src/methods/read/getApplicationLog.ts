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
  state: {
    type: 'Array';
    value: Argument[];
  };
}

interface Result {
  txid: string;
  blockIndex: number;
  executions: ExecutionDetails[];
}

export type GetApplicationLog = (params: Params) => Promise<Result>;
