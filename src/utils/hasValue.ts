export const hasValue = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;
