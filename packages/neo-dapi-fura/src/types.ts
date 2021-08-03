export enum MethodName {
  GetBlockByBlockHash = 'GetBlockByBlockHash',
  GetBlockByBlockHeight = 'GetBlockByBlockHeight',
  GetBlockCount = 'GetBlockCount',
}

export interface Witness {
  invocation: string;
  verification: string;
}

export interface Block {
  hash: string;
  index: number;
  merkleroot: string;
  networkFee: number;
  nextConsensus: string;
  prevhash: string;
  primary: number;
  size: number;
  systemFee: number;
  timestamp: number;
  version: number;
  witnesses: Witness[];
}
