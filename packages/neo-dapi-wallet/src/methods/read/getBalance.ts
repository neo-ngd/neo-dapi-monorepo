export const GET_BALANCE_METHOD = 'getBalance';

interface BalanceRequest {
  address: string;
  assets?: string[];
}

export interface GetBalanceParams {
  params: BalanceRequest | BalanceRequest[];
  network?: string;
}

interface Balance {
  assethash: string;
  amount: string;
}

export interface GetBalanceResult {
  [address: string]: Balance[];
}
