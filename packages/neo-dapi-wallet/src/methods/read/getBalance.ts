interface BalanceRequest {
  address: string;
  assetHashes?: string[];
}

interface Params {
  params: BalanceRequest | BalanceRequest[];
  network?: string;
}

interface Balance {
  assetHash: string;
  amount: string;
}

interface Result {
  [address: string]: Balance[];
}

export type GetBalance = (params: Params) => Promise<Result>;
