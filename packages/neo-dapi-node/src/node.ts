import { INeoProvider } from '@neongd/neo-provider';
import { GetBlock, GetBlockCount } from './methods';
import { Block, MethodName } from './types';

export class NeoDapiNode {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  getBlockCount(): ReturnType<GetBlockCount> {
    return this.provider.request({ method: MethodName.GetBlockCount, params: [] });
  }

  getBlock(index: number): Promise<string>;
  getBlock(index: number, verbose: false): Promise<string>;
  getBlock(index: number, verbose: true): Promise<Block>;
  getBlock(hash: string): Promise<string>;
  getBlock(hash: string, verbose: false): Promise<string>;
  getBlock(hash: string, verbose: true): Promise<Block>;
  getBlock(...params: Parameters<GetBlock>): ReturnType<GetBlock> {
    return this.provider.request({ method: MethodName.GetBlock, params });
  }
}
