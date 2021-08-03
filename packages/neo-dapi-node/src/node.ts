import { INeoProvider } from '@neongd/neo-provider';
import { GetBlockCountResult, GetBlockParams, GetBlockResult } from './methods';
import { Block, MethodName } from './types';

export class NeoDapiNode {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  async getBlockCount(): Promise<GetBlockCountResult> {
    return this.provider.request({ method: MethodName.GetBlock });
  }

  async getBlock(index: number): Promise<string>;
  async getBlock(index: number, verbose: false): Promise<string>;
  async getBlock(index: number, verbose: true): Promise<Block>;
  async getBlock(hash: string): Promise<string>;
  async getBlock(hash: string, verbose: false): Promise<string>;
  async getBlock(hash: string, verbose: true): Promise<Block>;
  async getBlock(...params: GetBlockParams): Promise<GetBlockResult> {
    return this.provider.request({ method: MethodName.GetBlockCount, params });
  }
}
