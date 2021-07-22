import { INeoProvider } from '@neongd/neo-provider';
import { GetProviderResult, INeoDapi } from './types';

export * from './types';

export class NeoDapi implements INeoDapi {
  constructor(private neoProvider: INeoProvider) {}

  async getProvider(): Promise<GetProviderResult> {
    return this.neoProvider.request({ method: 'getProvider' });
  }
}
