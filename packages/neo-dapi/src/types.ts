export interface GetProviderResult {
  name: string;
  version: string;
}

export interface INeoDapi {
  getProvider(): Promise<GetProviderResult>;
}
