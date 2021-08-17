interface Params {
  address: string;
  assetHashes?: string[];
  network?: string;
}

interface Balance {
  assetHash: string;
  amount: string;
}

type Result = Balance[];

export type GetBalance = (params: Params) => Promise<Result>;
