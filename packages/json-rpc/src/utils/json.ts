export function stringify(value: unknown): string {
  return JSON.stringify(value);
}

export function parse(string: string, defaultValue?: unknown): unknown {
  try {
    return JSON.parse(string);
  } catch (error) {
    if (defaultValue === undefined) {
      throw error;
    }
    return defaultValue;
  }
}
