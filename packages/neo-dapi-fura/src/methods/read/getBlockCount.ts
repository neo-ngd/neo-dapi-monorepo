interface Result {
  index: number;
}

export type GetBlockCount = () => Promise<Result>;
