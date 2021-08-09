type Params = [transaction: string];

interface Result {
  hash: string;
}

export type SendRawTransaction = (...params: Params) => Promise<Result>;
