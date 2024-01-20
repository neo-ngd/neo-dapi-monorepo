import {
  BaseTransport,
  BaseTransportOptions,
  formatErrorResponse,
  getStandardErrorResponse,
  RpcError,
  StandardErrorCodes,
  Transport,
} from '@neongd/json-rpc';
import {
  BroadcastTransactionParams,
  BroadcastTransactionResult,
  GetApplicationLogParams,
  GetApplicationLogResult,
  GetBlockCountParams,
  GetBlockCountResult,
  GetBlockParams,
  GetBlockResult,
  GetNep17BalancesParams,
  GetNep17BalancesResult,
  GetNetworksResult,
  GetProviderResult,
  GetTransactionParams,
  GetTransactionResult,
  InvokeReadMultiParams,
  InvokeReadMultiResult,
  InvokeReadParams,
  InvokeReadResult,
} from '../dapis/Dapi';
import {
  applicationLogJsonToApplicationLog,
  blockJsonToBlock,
  hexToBase64,
  invocationsToScript,
  signerToSignerJson,
  transactionJsonToTransaction,
} from '../utils/convertors';
import { DapiErrorCodes, getDapiErrorResponse } from '../utils/errors';
import { LIB_VERSION } from '../version';
import { AbstractProvider } from './AbstractProvider';
import { RequestArguments } from './Provider';

export interface NetworkConfig {
  name: string;
  nodeUrl: string;
  magicNumber: number;
}

export type NetworkProviderOptions = BaseTransportOptions;

export class NetworkProvider extends AbstractProvider {
  protected transports: Partial<Record<string, Transport>> = {};

  constructor(
    protected networkConfigs: NetworkConfig[],
    protected defaultNetworkName: string,
    protected options: NetworkProviderOptions = {},
  ) {
    super();
    if (!networkConfigs.find(config => config.name === defaultNetworkName)) {
      throw new Error(`Unknown network name ${defaultNetworkName}`);
    }
  }

  async request<R = unknown, P = unknown>(args: RequestArguments<P>): Promise<R> {
    switch (args.method) {
      case 'getProvider':
        return this.handleGetProvider() as R;
      case 'getNetworks':
        return this.handleGetNetworks() as R;
      case 'getBlockCount':
        return this.handleGetBlockCount(args.params as any) as R;
      case 'getBlock':
        return this.handleGetBlock(args.params as any) as R;
      case 'getTransaction':
        return this.handleGetTransaction(args.params as any) as R;
      case 'getApplicationLog':
        return this.handleGetApplicationLog(args.params as any) as R;
      case 'getNep17Balances':
        return this.handleGetNep17Balances(args.params as any) as R;
      case 'invokeRead':
        return this.handleInvokeRead(args.params as any) as R;
      case 'invokeReadMulti':
        return this.handleInvokeReadMulti(args.params as any) as R;
      case 'broadcastTransaction':
        return this.handleBroadcastTransaction(args.params as any) as R;
      default:
        throw new RpcError(getStandardErrorResponse(StandardErrorCodes.MethodNotFound));
    }
  }

  async close(): Promise<void> {
    for (const transport of Object.values(this.transports)) {
      await transport?.disconnect();
    }
  }

  changeNetwork(network: string): void {
    if (!this.networkConfigs.find(config => config.name === network)) {
      throw new Error(`Unknown network name ${network}`);
    }
    this.defaultNetworkName = network;
    this.events.emit('networkChanged', network);
  }

  protected getNetworkConfig(network?: string, rejectNotDefault = false): NetworkConfig {
    const finalNetwork = network ?? this.defaultNetworkName;
    if (rejectNotDefault && finalNetwork !== this.defaultNetworkName) {
      throw new RpcError(getDapiErrorResponse(DapiErrorCodes.UnsupportedNetwork));
    }

    const networkConfig = this.networkConfigs.find(config => config.name === finalNetwork);
    if (!networkConfig) {
      throw new RpcError(getDapiErrorResponse(DapiErrorCodes.UnsupportedNetwork));
    }
    return networkConfig;
  }

  protected getTransport(network?: string, rejectNotDefault?: boolean): Transport {
    const networkConfig = this.getNetworkConfig(network, rejectNotDefault);
    let transport = this.transports[networkConfig.name];

    if (!transport) {
      transport = new BaseTransport(networkConfig.nodeUrl, this.options);
      this.transports[networkConfig.name] = transport;
    }
    return transport;
  }

  protected async handleGetProvider(): Promise<GetProviderResult> {
    return {
      name: 'NetworkProvider',
      website: 'https://github.com/neo-ngd/neo-dapi-monorepo',
      version: LIB_VERSION,
      dapiVersion: LIB_VERSION,
      compatibility: ['NEP-17'],
      extra: {},
    };
  }

  protected async handleGetNetworks(): Promise<GetNetworksResult> {
    return {
      networks: this.networkConfigs.map(config => config.name),
      defaultNetwork: this.defaultNetworkName,
    };
  }

  protected async handleGetBlockCount(params: GetBlockCountParams): Promise<GetBlockCountResult> {
    const transport = this.getTransport(params.network);
    return transport.request<number>({ method: 'getblockcount' }).catch(this.convertRemoteRpcError);
  }

  protected async handleGetBlock(params: GetBlockParams): Promise<GetBlockResult> {
    const transport = this.getTransport(params.network);
    const result = await transport
      .request<any>({
        method: 'getblock',
        params: [params.blockIndex, true],
      })
      .catch(this.convertRemoteRpcError);
    return blockJsonToBlock(result);
  }

  protected async handleGetTransaction(
    params: GetTransactionParams,
  ): Promise<GetTransactionResult> {
    const transport = this.getTransport(params.network);
    const result = await transport
      .request({
        method: 'getrawtransaction',
        params: [params.txid, true],
      })
      .catch(this.convertRemoteRpcError);
    return transactionJsonToTransaction(result);
  }

  protected async handleGetApplicationLog(
    params: GetApplicationLogParams,
  ): Promise<GetApplicationLogResult> {
    const transport = this.getTransport(params.network);
    const result = await transport
      .request<any>({
        method: 'getapplicationlog',
        params: [params.txid],
      })
      .catch(this.convertRemoteRpcError);
    return applicationLogJsonToApplicationLog(result);
  }

  protected async handleGetNep17Balances(
    params: GetNep17BalancesParams,
  ): Promise<GetNep17BalancesResult> {
    const transport = this.getTransport(params.network);
    const result = await transport
      .request<any>({
        method: 'getnep17balances',
        params: [params.address],
      })
      .catch(this.convertRemoteRpcError);
    return result.balance.map((balance: any) => ({
      assetHash: balance.assethash,
      amount: balance.amount,
    }));
  }

  protected async handleInvokeRead(params: InvokeReadParams): Promise<InvokeReadResult> {
    const transport = this.getTransport(params.network);
    const result = await transport
      .request<any>({
        method: 'invokefunction',
        params: [
          params.scriptHash,
          params.operation,
          params.args ?? [],
          (params.signers ?? []).map(signerToSignerJson),
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

  protected async handleInvokeReadMulti(
    params: InvokeReadMultiParams,
  ): Promise<InvokeReadMultiResult> {
    const script = invocationsToScript(params.invocations);
    const transport = this.getTransport(params.network);
    const result = await transport
      .request<any>({
        method: 'invokescript',
        params: [hexToBase64(script), (params.signers ?? []).map(signerToSignerJson)],
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

  protected async handleBroadcastTransaction(
    params: BroadcastTransactionParams,
  ): Promise<BroadcastTransactionResult> {
    const networkConfig = this.getNetworkConfig(params.network);
    const transport = this.getTransport(params.network);
    const result = await transport
      .request<any>({
        method: 'sendrawtransaction',
        params: [params.signedTx],
      })
      .catch(this.convertRemoteRpcError);
    return { txid: result.hash, nodeUrl: networkConfig.nodeUrl };
  }

  protected convertRemoteRpcError(error: Error): never {
    throw new RpcError(
      getDapiErrorResponse(
        DapiErrorCodes.RemoteRpcError,
        error.message,
        formatErrorResponse(error),
      ),
    );
  }
}
