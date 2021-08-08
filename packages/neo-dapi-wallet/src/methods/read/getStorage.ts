interface Params {
  scriptHash: string;
  key: string;
  network?: string;
}

type Result = string;

export type GetStorage = (params: Params) => Promise<Result>;
