import { sc } from '@cityofzion/neon-js';
import {
  ErrorResponse,
  getStandardErrorResponse,
  IJsonRpcTransport,
  JsonRpcTransport,
  RpcError,
  StandardErrorCodes,
} from '@neongd/json-rpc';
import {
  Account,
  ApplicationLog,
  Argument,
  Attribute,
  Block,
  INeoDapi,
  Invocation,
  Nep17Balance,
  Networks,
  Provider,
  Signer,
  Transaction,
} from './types';
import { getNeoDapiErrorResponse, NeoDapiErrorCodes } from '.';

export class NeoDapiNodeAdapter implements INeoDapi {
  protected transport: IJsonRpcTransport;

  constructor(nodeUrl: string) {
    this.transport = new JsonRpcTransport(nodeUrl);
  }

  getProvider(): Promise<Provider> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  getNetworks(): Promise<Networks> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  getAccount(): Promise<Account> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  async getNep17Balances(params: {
    address: string;
    assetHashes?: string[];
    network?: string;
  }): Promise<Nep17Balance[]> {
    const result = await this.transport
      .request({
        method: 'getnep17balances',
        params: [params.address],
      })
      .catch(this.convertRemoteRpcError);
    const balanceMap = result.balance.reduce(
      (acc: any, cur: any) => Object.assign(acc, { [cur.assethash]: cur }),
      {} as any,
    );
    const assetHashes =
      params.assetHashes ?? result.balance.map((balance: any) => balance.assethash);

    return assetHashes.map((assetHash: string) => ({
      assetHash,
      amount: balanceMap[assetHash]?.amount ?? '0',
    }));
  }

  async getBlockCount(): Promise<number> {
    const result = await this.transport
      .request({
        method: 'getblockcount',
        params: [],
      })
      .catch(this.convertRemoteRpcError);
    return result;
  }

  async getBlock(params: { blockIndex: number; network?: string }): Promise<Block> {
    const result = await this.transport
      .request({
        method: 'getblock',
        params: [params.blockIndex, true],
      })
      .catch(this.convertRemoteRpcError);
    return {
      hash: result.hash,
      size: result.size,
      version: result.version,
      previousBlockHash: result.previousblockhash,
      merkleRoot: result.merkleroot,
      time: result.time,
      index: result.index,
      primary: result.primary,
      nextConsensus: result.nextconsensus,
      witnesses: result.witnesses,
      tx: result.tx.map(this.deserializeTransaction.bind(this)),
      confirmations: result.confirmations,
      nextBlockHash: result.nextblockhash,
    };
  }

  async getTransaction(params: { txid: string; network?: string }): Promise<Transaction> {
    const result = await this.transport
      .request({
        method: 'getrawtransaction',
        params: [params.txid, true],
      })
      .catch(this.convertRemoteRpcError);
    return this.deserializeTransaction(result);
  }

  async getApplicationLog(params: { txid: string; network?: string }): Promise<ApplicationLog> {
    const result = await this.transport
      .request({
        method: 'getapplicationlog',
        params: [params.txid],
      })
      .catch(this.convertRemoteRpcError);
    return {
      txid: result.txid,
      executions: result.executions.map((execution: any) => ({
        trigger: execution.trigger,
        vmState: execution.vmstate,
        exception: execution.exception,
        gasConsumed: execution.gasconsumed,
        stack: execution.stack,
        notifications: execution.notifications.map((notification: any) => ({
          contract: notification.contract,
          eventName: notification.eventname,
          state: notification.state,
        })),
      })),
    };
  }

  async getStorage(params: { scriptHash: string; key: string; network?: string }): Promise<string> {
    const result = await this.transport
      .request({
        method: 'getstorage',
        params: [params.scriptHash, params.key],
      })
      .catch(this.convertRemoteRpcError);
    return result;
  }

  async invokeRead(params: {
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
  }> {
    const result = await this.transport
      .request({
        method: 'invokefunction',
        params: [
          params.scriptHash,
          params.operation,
          params.args ?? [],
          (params.signers ?? []).map(this.serializeSigner.bind(this)),
        ],
      })
      .catch(this.convertRemoteRpcError);
    return {
      script: result.script,
      state: result.state,
      exception: result.exception,
      gasConsumed: result.gasconsumed,
      stack: result.stack,
    };
  }

  async invokeReadMulti(params: {
    invocations: Invocation[];
    signers?: Signer[];
    network?: string;
  }): Promise<{
    script: string;
    state: string;
    exception: string | null;
    gasConsumed: string;
    stack: Argument[];
  }> {
    const script = sc.createScript(...params.invocations);
    const base64Script = Buffer.from(script, 'hex').toString('base64');
    const result = await this.transport
      .request({
        method: 'invokescript',
        params: [base64Script, (params.signers ?? []).map(this.serializeSigner.bind(this))],
      })
      .catch(this.convertRemoteRpcError);
    return {
      script: result.script,
      state: result.state,
      exception: result.exception,
      gasConsumed: result.gasconsumed,
      stack: result.stack,
    };
  }

  invoke(_params: {
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
  }> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  invokeMulti(_params: {
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
  }> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  private deserializeTransaction(transation: any): Transaction {
    return {
      hash: transation.hash,
      size: transation.size,
      version: transation.version,
      nonce: transation.nonce,
      sender: transation.sender,
      systemFee: transation.sysfee,
      networkFee: transation.netfee,
      validUntilBlock: transation.validuntilblock,
      signers: transation.signers.map(this.deserializeSigner.bind(this)),
      attributes: transation.attributes,
      script: transation.script,
      witnesses: transation.witnesses,
      blockHash: transation.blockhash,
      confirmations: transation.confirmations,
      blockTime: transation.blocktime,
    };
  }

  private deserializeSigner(signer: any): Signer {
    return {
      account: signer.account,
      scopes: signer.scopes,
      allowedContracts: signer.allowedcontracts,
      allowedGroups: signer.allowedgroups,
    };
  }

  private serializeSigner(signer: Signer): any {
    return {
      account: signer.account,
      scopes: signer.scopes,
      allowedcontracts: signer.allowedContracts,
      allowedgroups: signer.allowedGroups,
    };
  }

  private convertRemoteRpcError(error: ErrorResponse): any {
    throw new RpcError({
      ...getNeoDapiErrorResponse(NeoDapiErrorCodes.RemoteRpcError),
      data: error,
    });
  }
}
