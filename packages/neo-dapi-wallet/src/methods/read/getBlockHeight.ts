export const GET_BLOCK_HEIGHT_METHOD = 'getBlockHeight';

export interface GetBlockHeightParams {
  network?: string;
}

export type GetBlockHeightResult = number;
