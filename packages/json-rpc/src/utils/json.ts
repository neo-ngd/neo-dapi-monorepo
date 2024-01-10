export function stringify(value: unknown): string {
  return JSON.stringify(value);
}

export function parse<T = unknown>(string: string, defaultValue: T): T {
  try {
    return JSON.parse(string);
  } catch (error) {
    if (defaultValue === undefined) {
      throw error;
    }
    return defaultValue;
  }
}
