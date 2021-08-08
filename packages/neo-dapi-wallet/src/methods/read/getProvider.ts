interface Result {
  name: string;
  version: string;
}

export type GetProvider = () => Promise<Result>;
