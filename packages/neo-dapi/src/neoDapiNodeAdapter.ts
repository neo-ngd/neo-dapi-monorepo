import { sc } from '@cityofzion/neon-js';
import {
  formatErrorResponse,
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

  constructor(urlOrTransport: string | IJsonRpcTransport) {
    if (typeof urlOrTransport === 'string') {
      this.transport = new JsonRpcTransport(urlOrTransport);
    } else {
      this.transport = urlOrTransport;
    }
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
    const script = sc.createScript(
      ...params.invocations.map(invocation => ({
        ...invocation,
        args: invocation.args?.map(arg => sc.ContractParam.fromJson(arg)),
      })),
    );
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

  signMessage(_params: {
    message: string;
  }): Promise<{ salt: string; signature: string; publicKey: string }> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  verifyMessage(_params: {
    message: string;
    salt: string;
    signature: string;
    publicKey: string;
  }): Promise<boolean> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  signTransaction(_params: {
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
  }): Promise<{ signature: string; publicKey: string }> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  relayTransaction(_params: { signedTx: string; network?: string }): Promise<{
    txid: string;
    nodeUrl: string;
  }> {
    throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
  }

  private deserializeTransaction(transaction: any): Transaction {
    return {
      hash: transaction.hash,
      size: transaction.size,
      version: transaction.version,
      nonce: transaction.nonce,
      sender: transaction.sender,
      systemFee: transaction.sysfee,
      networkFee: transaction.netfee,
      validUntilBlock: transaction.validuntilblock,
      signers: transaction.signers.map(this.deserializeSigner.bind(this)),
      attributes: transaction.attributes,
      script: transaction.script,
      witnesses: transaction.witnesses,
      blockHash: transaction.blockhash,
      confirmations: transaction.confirmations,
      blockTime: transaction.blocktime,
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

  private convertRemoteRpcError(error: Error) {
    throw new RpcError({
      ...getNeoDapiErrorResponse(NeoDapiErrorCodes.RemoteRpcError),
      data: formatErrorResponse(error),
    });
  }
}
