type Params = [scriptHash: string, key: string];

type Result = string;

export type GetStorage = (...params: Params) => Promise<Result>;
