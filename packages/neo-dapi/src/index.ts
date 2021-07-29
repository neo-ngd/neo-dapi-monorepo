import { GET_PROVIDER_METHOD, GetProviderResult, INeoProvider } from '@neongd/neo-provider';

export class NeoDapi {
  constructor(private provider: INeoProvider) {}

  async getProvider(): Promise<GetProviderResult> {
    return this.provider.request({ method: GET_PROVIDER_METHOD });
  }
}
