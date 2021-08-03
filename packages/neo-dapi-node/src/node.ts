import { INeoProvider } from '@neongd/neo-provider';
import {
  GET_BLOCK_COUNT_METHOD,
  GET_BLOCK_METHOD,
  GetBlockCountResult,
  GetBlockParams,
  GetBlockResult,
} from './methods';
import { Block } from './methods/types';

export class NeoDapiNode {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  async getBlockCount(): Promise<GetBlockCountResult> {
    return this.provider.request({ method: GET_BLOCK_COUNT_METHOD });
  }

  async getBlock(index: number): Promise<string>;
  async getBlock(index: number, verbose: false): Promise<string>;
  async getBlock(index: number, verbose: true): Promise<Block>;
  async getBlock(hash: string): Promise<string>;
  async getBlock(hash: string, verbose: false): Promise<string>;
  async getBlock(hash: string, verbose: true): Promise<Block>;
  async getBlock(...params: GetBlockParams): Promise<GetBlockResult> {
    return this.provider.request({ method: GET_BLOCK_METHOD, params });
  }
}
