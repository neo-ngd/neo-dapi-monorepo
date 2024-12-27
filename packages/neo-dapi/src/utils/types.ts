import EventEmitter from 'eventemitter3';
import { UnionConcat } from './typeUtils';

export interface EventDispatcher<Events extends EventEmitter.ValidEventTypes> {
  on<T extends EventEmitter.EventNames<Events>>(
    event: T,
    fn: EventEmitter.EventListener<Events, T>,
  ): void;

  removeListener<T extends EventEmitter.EventNames<Events>>(
    event: T,
    fn: EventEmitter.EventListener<Events, T>,
  ): void;
}

export type ProviderInformation = {
  name: string;
  website: string;
  version: string;
  dapiVersion: string;
  compatibility: string[];
  extra: Record<string, unknown>;
};

export type Networks = {
  networks: string[];
  defaultNetwork: string;
};

export type Account = {
  address: string;
  publicKey: string;
  label?: string;
};

export type Witness = {
  invocation: string;
  verification: string;
};

export type SignerScope =
  | 'None'
  | 'CalledByEntry'
  | 'CustomContracts'
  | 'CustomGroups'
  | 'Global'
  | 'WitnessRules';

export type WitnessRuleAction = 'Deny' | 'Allow';

export type BooleanWitnessCondition = {
  type: 'Boolean';
  expression: boolean;
};

export type NotWitnessCondition = {
  type: 'Not';
  expression: WitnessCondition;
};

export type AndWitnessCondition = {
  type: 'And';
  expressions: WitnessCondition[];
};

export type OrWitnessCondition = {
  type: 'Or';
  expressions: WitnessCondition[];
};

export type ScriptHashWitnessCondition = {
  type: 'ScriptHash';
  hash: string;
};

export type GroupWitnessCondition = {
  type: 'Group';
  group: string;
};

export type CalledByEntryWitnessCondition = {
  type: 'CalledByEntry';
};

export type CalledByContractWitnessCondition = {
  type: 'CalledByContract';
  hash: string;
};

export type CalledByGroupWitnessCondition = {
  type: 'CalledByGroup';
  group: string;
};

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

export type WitnessRule = {
  action: WitnessRuleAction;
  condition: WitnessCondition;
};

export type Signer = {
  account: string;
  scopes: UnionConcat<SignerScope, ','>;
  allowedContracts?: string[];
  allowedGroups?: string[];
  rules?: WitnessRule[];
};

export type HighPriorityAttribute = {
  type: 'HighPriority';
};

export type OracleResponseCode =
  | 'Success'
  | 'ProtocolNotSupported'
  | 'ConsensusUnreachable'
  | 'NotFound'
  | 'Timeout'
  | 'Forbidden'
  | 'ResponseTooLarge'
  | 'InsufficientFunds'
  | 'ContentTypeNotSupported'
  | 'Error';

export type OracleResponseAttribute = {
  type: 'OracleResponse';
  id: number;
  code: OracleResponseCode;
  result: string;
};

export type Attribute = HighPriorityAttribute | OracleResponseAttribute;

export type Transaction = {
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
};

export type Block = {
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
};

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

export type Argument = {
  type: ArgumentType;
  value: unknown;
};

export type Notification = {
  contract: string;
  eventName: string;
  state: Argument;
};

export type Execution = {
  trigger: string;
  vmState: string;
  exception: string | null;
  gasConsumed: string;
  stack: Argument[];
  notifications: Notification[];
};

export type ApplicationLog = {
  txid: string;
  executions: Execution[];
};

export type Nep17Balance = {
  assetHash: string;
  amount: string;
};

export type Invocation = {
  scriptHash: string;
  operation: string;
  args?: Argument[];
};
