export interface Argument {
  type: string;
  value: any;
}

export interface Signer {
  account: string;
  scopes: string;
  allowedContracts?: string[];
  allowedGroups?: string[];
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
  systemFee: string;
  networkFee: string;
  validUntilBlock: number;
  signers: Signer[];
  attributes: TransactionAttribute[];
  script: string;
  witnesses: Witness[];
  blockHash: string;
  confirmations: number;
  blockTime: number;
}

export interface Block {
  hash: string;
  size: number;
  version: number;
  previousBlockHash: string;
  merkleRoot: string;
  time: number;
  index: number;
  primary: number;
  nextConsensus: string;
  witnesses: Witness[];
  tx: Transaction[];
  confirmations: number;
  nextBlockHash: string;
}

export interface Execution {
  trigger: string;
  vmState: string;
  gasConsumed: string;
  stack: Argument[];
  exception: string | null;
  notifications: Notification[];
}

export interface Notification {
  contract: string;
  eventName: string;
  state: Argument;
}

export interface ApplicationLog {
  txid: string;
  executions: Execution[];
}

export interface Balance {
  assetHash: string;
  amount: string;
}

export interface Invocation {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}

export interface GetAccountResult {
  address: string;
  label?: string;
}

export interface GetApplicationLogParams {
  txid: string;
  network?: string;
}

export type GetApplicationLogResult = ApplicationLog;

export interface GetBalanceParams {
  address: string;
  assetHashes?: string[];
  network?: string;
}

export type GetBalanceResult = Balance[];

export interface GetBlockParams {
  blockIndex: number;
  network?: string;
}

export type GetBlockResult = Block;

export interface GetBlockCountParams {
  network?: string;
}

export type GetBlockCountResult = number;

export interface GetNetworksResult {
  networks: string[];
  defaultNetwork: string;
}

export interface GetProviderResult {
  name: string;
  version: string;
}

export interface GetPublicKeyResult {
  address: string;
  publicKey: string;
}

export interface GetStorageParams {
  scriptHash: string;
  key: string;
  network?: string;
}

export type GetStorageResult = string;

export interface GetTransactionParams {
  txid: string;
  network?: string;
}

export type GetTransactionResult = Transaction;

export interface InvokeReadParams {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  signers?: Signer[];
  network?: string;
}

export interface InvokeReadResult {
  script: string;
  state: string;
  gasConsumed: string;
  stack: Argument[];
}

export interface InvokeReadMultiParams {
  invokeArgs: Invocation[];
  signers?: Signer[];
  network?: string;
}

export interface InvokeReadMultiResult {
  script: string;
  state: string;
  gasConsumed: string;
  stack: Argument[];
}

export interface InvokeParams {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  attrs?: TransactionAttribute[];
  signers?: Signer[];
  network?: string;
  fee?: string;
  broadcastOverride?: boolean;
}

export interface InvokeResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}

export interface InvokeMultiParams {
  invokeArgs: Invocation[];
  attrs?: TransactionAttribute[];
  signers?: Signer[];
  network?: string;
  fee?: string;
  broadcastOverride?: boolean;
}

export interface InvokeMultiResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}

export interface INeoDapi {
  getProvider(): Promise<GetProviderResult>;

  getAccount(): Promise<GetAccountResult>;

  getPublicKey(): Promise<GetPublicKeyResult>;

  getNetworks(): Promise<GetNetworksResult>;

  getBalance(params: GetBalanceParams): Promise<GetBalanceResult>;

  getBlockCount(params: GetBlockCountParams): Promise<GetBlockCountResult>;

  getBlock(params: GetBlockParams): Promise<GetBlockResult>;

  getTransaction(params: GetTransactionParams): Promise<GetTransactionResult>;

  getApplicationLog(params: GetApplicationLogParams): Promise<GetApplicationLogResult>;

  getStorage(params: GetStorageParams): Promise<GetStorageResult>;

  invokeRead(params: InvokeReadParams): Promise<InvokeReadResult>;

  invokeReadMulti(params: InvokeReadMultiParams): Promise<InvokeReadMultiResult>;

  invoke(params: InvokeParams): Promise<InvokeResult>;

  invokeMulti(params: InvokeMultiParams): Promise<InvokeMultiResult>;
}
