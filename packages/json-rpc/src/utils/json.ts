import { Json } from './types';

export function stringify(value: Json): string {
  return JSON.stringify(value);
}

export function parse(string: string, defaultValue?: Json): Json {
  try {
    return JSON.parse(string);
  } catch (error) {
    if (defaultValue === undefined) {
      throw error;
    }
    return defaultValue;
  }
}
