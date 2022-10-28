import { UnionConcat } from './utils';

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

export interface Witness {
  invocation: string;
  verification: string;
}

export type SignerScope =
  | 'None'
  | 'CalledByEntry'
  | 'CustomContracts'
  | 'CustomGroups'
  | 'Global'
  | 'WitnessRules';

export interface BooleanWitnessCondition {
  type: 'Boolean';
  expression: boolean;
}

export interface NotWitnessCondition {
  type: 'Not';
  expression: WitnessCondition;
}

export interface AndWitnessCondition {
  type: 'And';
  expressions: WitnessCondition[];
}

export interface OrWitnessCondition {
  type: 'Or';
  expressions: WitnessCondition[];
}

export interface ScriptHashWitnessCondition {
  type: 'ScriptHash';
  hash: string;
}

export interface GroupWitnessCondition {
  type: 'Group';
  group: string;
}

export interface CalledByEntryWitnessCondition {
  type: 'CalledByEntry';
}

export interface CalledByContractWitnessCondition {
  type: 'CalledByContract';
  hash: string;
}

export interface CalledByGroupWitnessCondition {
  type: 'CalledByGroup';
  group: string;
}

export type WitnessCondition =
  | BooleanWitnessCondition
  | AndWitnessCondition
  | NotWitnessCondition
  | OrWitnessCondition
  | ScriptHashWitnessCondition
  | GroupWitnessCondition
  | CalledByEntryWitnessCondition
  | CalledByContractWitnessCondition
  | CalledByGroupWitnessCondition;

export type WitnessRuleAction = 'Deny' | 'Allow';

export interface WitnessRule {
  action: WitnessRuleAction;
  condition: WitnessCondition;
}

export interface Signer {
  account: string;
  scopes: UnionConcat<SignerScope, ','>;
  allowedContracts?: string[];
  allowedGroups?: string[];
  rules?: WitnessRule[];
}

export type AttributeUsage = 'Url';

export interface Attribute {
  usage: AttributeUsage;
  data: string;
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

export type ArgumentType =
  | 'Any'
  | 'Boolean'
  | 'Integer'
  | 'ByteArray'
  | 'String'
  | 'Hash160'
  | 'Hash256'
  | 'PublicKey'
  | 'Signature'
  | 'Array'
  | 'Map'
  | 'InteropInterface'
  | 'Void';

export interface Argument {
  type: ArgumentType;
  value: any;
}

export interface Notification {
  contract: string;
  eventName: string;
  state: Argument;
}

export interface Execution {
  trigger: string;
  vmState: string;
  exception: string | null;
  gasConsumed: string;
  stack: Argument[];
  notifications: Notification[];
}

export interface ApplicationLog {
  txid: string;
  executions: Execution[];
}

export interface Invocation {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}

export interface NeoDapi {
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

  signTransaction(params: {
    version: number;
    nonce: number;
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
