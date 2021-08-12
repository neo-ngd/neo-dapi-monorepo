export function stringify(value: any): string {
  return JSON.stringify(value);
}

export function parse(string: string, defaultValue: any): any {
  try {
    return JSON.parse(string);
  } catch (error) {
    if (defaultValue === undefined) {
      throw error;
    }
    return defaultValue;
  }
}
