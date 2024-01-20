import EventEmitter from 'eventemitter3';
import { UnionConcat } from '../utils/typeUtils';

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

export interface ProviderInformation {
  name: string;
  website: string;
  version: string;
  dapiVersion: string;
  compatibility: string[];
  extra: Record<string, unknown>;
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

export type WitnessRuleAction = 'Deny' | 'Allow';

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

export interface HighPriorityAttribute {
  type: 'HighPriority';
}

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

export interface OracleResponseAttribute {
  type: 'OracleResponse';
  id: number;
  code: OracleResponseCode;
  result: string;
}

export type Attribute = HighPriorityAttribute | OracleResponseAttribute;

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
  value: unknown;
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

export interface Nep17Balance {
  assetHash: string;
  amount: string;
}

export interface Invocation {
  scriptHash: string;
  operation: string;
  args?: Argument[];
}
