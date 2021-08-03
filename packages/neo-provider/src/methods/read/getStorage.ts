export const GET_STORAGE_METHOD = 'getStorage';

export interface GetStorageParams {
  scriptHash: string;
  key: string;
  network?: string;
}

export type GetStorageResult = string;
