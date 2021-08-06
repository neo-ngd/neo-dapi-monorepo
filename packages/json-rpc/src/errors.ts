import { INTERNAL_ERROR, STANDARD_ERROR_MAP } from './constants';
import { ErrorResponse } from './types';

export function isValidErrorCode(code: number): boolean {
  return typeof code === 'number';
}

export function getError(type: string): ErrorResponse {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[INTERNAL_ERROR];
  }
  return (STANDARD_ERROR_MAP as any)[type];
}
