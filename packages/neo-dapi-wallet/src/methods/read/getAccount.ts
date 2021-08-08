interface Result {
  address: string;
  label?: string;
}

export type GetAccount = () => Promise<Result>;
