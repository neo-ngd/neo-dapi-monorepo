import { INeoProvider } from '@neongd/neo-provider';
import {
  GetApplicationLog,
  GetBlock,
  GetBlockCount,
  GetNep17Balances,
  GetRawTransaction,
  GetStorage,
  InvokeFunction,
  InvokeScript,
  SendRawTransaction,
} from './methods';
import { Block, MethodName, Transaction } from './types';

export class NeoDapiNode {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider): void {
    this.provider = provider;
  }

  getBlockCount(): ReturnType<GetBlockCount> {
    return this.provider.request({ method: MethodName.GetBlockCount, params: [] });
  }

  getBlock(index: number, verbose?: false): Promise<string>;
  getBlock(index: number, verbose: true): Promise<Block>;
  getBlock(index: number, verbose: boolean): Promise<Block | string>;
  getBlock(hash: string, verbose?: false): Promise<string>;
  getBlock(hash: string, verbose: true): Promise<Block>;
  getBlock(hash: string, verbose: boolean): Promise<Block | string>;
  getBlock(...params: Parameters<GetBlock>): ReturnType<GetBlock> {
    return this.provider.request({ method: MethodName.GetBlock, params });
  }

  getNep17Balances(...params: Parameters<GetNep17Balances>): ReturnType<GetNep17Balances> {
    return this.provider.request({ method: MethodName.GetNep17Balances, params });
  }

  getStorage(...params: Parameters<GetStorage>): ReturnType<GetStorage> {
    return this.provider.request({ method: MethodName.GetStorage, params });
  }

  getRawTransaction(txid: string, verbose?: false): Promise<string>;
  getRawTransaction(txid: string, verbose: true): Promise<Transaction>;
  getRawTransaction(txid: string, verbose: boolean): Promise<Transaction | string>;
  getRawTransaction(...params: Parameters<GetRawTransaction>): ReturnType<GetRawTransaction> {
    return this.provider.request({ method: MethodName.GetRawTransaction, params });
  }

  getApplicationLog(...params: Parameters<GetApplicationLog>): ReturnType<GetApplicationLog> {
    return this.provider.request({ method: MethodName.GetApplicationLog, params });
  }

  invokeFunction(...params: Parameters<InvokeFunction>): ReturnType<InvokeFunction> {
    return this.provider.request({ method: MethodName.InvokeFunction, params });
  }

  invokeScript(...params: Parameters<InvokeScript>): ReturnType<InvokeScript> {
    return this.provider.request({ method: MethodName.InvokeScript, params });
  }

  sendRawTransaction(...params: Parameters<SendRawTransaction>): ReturnType<SendRawTransaction> {
    return this.provider.request({ method: MethodName.SendRawTransaction, params });
  }
}
