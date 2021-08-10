export enum MethodName {
  GetApplicationLog = 'getapplicationlog',
  GetBlock = 'getblock',
  GetBlockCount = 'getblockcount',
  GetNep17Balances = 'getnep17balances',
  GetRawTransaction = 'getrawtransaction',
  GetStorage = 'getstorage',
  InvokeFunction = 'invokefunction',
  InvokeScript = 'invokescript',
  SendRawTransaction = 'sendrawtransaction',
}

export enum ArgumentDataType {
  Any = 'Any',
  Boolean = 'Boolean',
  Integer = 'Integer',
  ByteArray = 'ByteArray',
  String = 'String',
  Hash160 = 'Hash160',
  Hash256 = 'Hash256',
  PublicKey = 'PublicKey',
  Signature = 'Signature',
  Array = 'Array',
  Map = 'Map',
  InteropInterface = 'InteropInterface',
  Void = 'Void',
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
