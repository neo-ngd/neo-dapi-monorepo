export interface Provider {
  name: string;
  website: string;
  version: string;
  dapiVersion: string;
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
  attributes: Attribute[];
  script: string;
  witnesses: Witness[];
  blockHash: string;
  confirmations: number;
  blockTime: number;
}

export interface Attribute {
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
  exception: string | null;
  gasConsumed: string;
  stack: Argument[];
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

export interface Signer {
  account: string;
  scopes: string;
  allowedContracts?: string[];
  allowedGroups?: string[];
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

  getStorage(params: { scriptHash: string; key: string; network?: string }): Promise<string>;

  invokeRead(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    signers?: Signer[];
    network?: string;
  }): Promise<{
    script: string;
    state: string;
    exception: string | null;
    gasConsumed: string;
    stack: Argument[];
  }>;

  invokeReadMulti(params: {
    invocations: Invocation[];
    signers?: Signer[];
    network?: string;
  }): Promise<{
    script: string;
    state: string;
    exception: string | null;
    gasConsumed: string;
    stack: Argument[];
  }>;

  invoke(params: {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    attributes?: Attribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<{
    txid: string;
    nodeUrl?: string;
    signedTx?: string;
  }>;

  invokeMulti(params: {
    invocations: Invocation[];
    attributes?: Attribute[];
    signers?: Signer[];
    network?: string;
    extraSystemFee?: string;
    extraNetworkFee?: string;
    broadcastOverride?: boolean;
  }): Promise<{
    txid: string;
    nodeUrl?: string;
    signedTx?: string;
  }>;

  signMessage(params: {
    message: string;
  }): Promise<{ salt: string; signature: string; publicKey: string }>;

  verifyMessage(params: {
    message: string;
    salt: string;
    signature: string;
    publicKey: string;
  }): Promise<boolean>;

  signTransation(params: {
    version: number;
    nounce: number;
    systemFee: string;
    networkFee: string;
    validUntilBlock: string;
    script: string;
    invocations?: Invocation[];
    attributes?: Attribute[];
    signers?: Signer[];
    network?: string;
  }): Promise<{ signature: string; publicKey: string }>;

  relayTransaction(params: { signedTx: string; network?: string }): Promise<{
    txid: string;
    nodeUrl: string;
  }>;
}
