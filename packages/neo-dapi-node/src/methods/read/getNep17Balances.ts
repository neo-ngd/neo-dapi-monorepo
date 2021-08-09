type Params = [address: string];

interface Balance {
  assethash: string;
  amount: string;
  lastupdatedblock: number;
}

interface Result {
  address: string;
  balance: Balance[];
}

export type GetNep17Balances = (...params: Params) => Promise<Result>;
