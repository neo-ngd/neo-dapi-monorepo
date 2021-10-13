export interface Provider {
  name: string;
  website: string;
  version: string;
  compatibility: string[];
  extra: Record<string, any>;
}

export interface Networks {
  networks: string[];
  defaultNetwork: string;
}

export interface Account {
  address: string;
  publicKey: string;
  label?: string;
}

export interface Nep17Balance {
  assetHash: string;
  amount: string;
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

export interface TransactionAttribute {
  usage: string;
  data: string;
}

export interface ApplicationLog {
  txid: string;
  executions: Execution[];
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

export interface Invocation {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}

export interface Argument {
  type: string;
  value: any;
}

export interface InvokeReadResult {
  script: string;
  state: string;
  gasConsumed: string;
  stack: Argument[];
}

export interface Signer {
  account: string;
  scopes: string;
  allowedContracts?: string[];
  allowedGroups?: string[];
}

export interface InvokeResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}

export interface INeoDapi {
  getProvider(): Promise<Provider>;

  getNetworks(): Promise<Networks>;

  getAccount(): Promise<Account>;

  getNep17Balances(params: {
    address: string;
    assetHashes?: string[];
    network?: string;
  }): Promise<Nep17Balance[]>;

  getBlockCount(params: { network?: string }): Promise<number>;

  getBlock(params: { blockIndex: number; network?: string }): Promise<Block>;

  getTransaction(params: { txid: string; network?: string }): Promise<Transaction>;

  getApplicationLog(params: { txid: string; network?: string }): Promise<ApplicationLog>;

  getStorage(params: { scriptHash: string; key: string; network?: string }): Promise<Storage>;

  invokeRead(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    signers?: Signer[];
    network?: string;
  }): Promise<InvokeReadResult>;

  invokeReadMulti(params: {
    invokeArgs: Invocation[];
    signers?: Signer[];
    network?: string;
  }): Promise<InvokeReadResult>;

  invoke(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    attrs?: TransactionAttribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<InvokeResult>;

  invokeMulti(params: {
    invokeArgs: Invocation[];
    attrs?: TransactionAttribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<InvokeResult>;
}
