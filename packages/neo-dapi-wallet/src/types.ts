export enum MethodName {
  GetAccount = 'getAccount',
  GetApplicationLog = 'getApplicationLog',
  GetBalance = 'getBalance',
  GetBlock = 'getBlock',
  GetBlockHeight = 'getBlockHeight',
  GetNetworks = 'getNetworks',
  GetProvider = 'getProvider',
  GetPublicKey = 'getPublicKey',
  GetStorage = 'getStorage',
  GetTransaction = 'getTransaction',
  InvokeRead = 'invokeRead',
  InvokeReadMulti = 'invokeReadMulti',
  PickAddress = 'pickAddress',
  VerifyMessage = 'verifyMessage',
  Deploy = 'deploy',
  Invoke = 'invoke',
  InvokeMulti = 'invokeMulti',
  Send = 'send',
  SignMessage = 'signMessage',
}

export enum ArgumentDataType {
  STRING = 'String',
  BOOLEAN = 'Boolean',
  HASH160 = 'Hash160',
  HASH256 = 'Hash256',
  INTEGER = 'Integer',
  BYTEARRAY = 'ByteArray',
  ARRAY = 'Array',
  ADDRESS = 'Address',
}

export interface Argument {
  type: ArgumentDataType;
  value: any;
}

export interface Signer {
  account: string;
  scopes: string;
  allowedcontracts?: string[];
  allowedgroups?: string[];
}

export interface TransactionAttribute {
  usage: string;
  data: string;
}

export interface Witness {
  invocation: string;
  verification: string;
}

export interface Transaction {
  hash: string;
  size: number;
  version: number;
  nonce: number;
  sender: string;
  sysfee: string;
  netfee: string;
  validuntilblock: number;
  signers: Signer[];
  attributes: TransactionAttribute[];
  script: string;
  witnesses: Witness[];
  blockhash: string;
  confirmations: number;
  blocktime: number;
}

export interface Block {
  hash: string;
  size: number;
  version: number;
  previousblockhash: string;
  merkleroot: string;
  time: number;
  index: number;
  primary: number;
  nextconsensus: string;
  witnesses: Witness[];
  tx: Transaction[];
  confirmations: number;
  nextblockhash: string;
}