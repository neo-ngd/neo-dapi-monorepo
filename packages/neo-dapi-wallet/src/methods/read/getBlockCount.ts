interface Params {
  network?: string;
}

type Result = number;

export type GetBlockCount = (params: Params) => Promise<Result>;
