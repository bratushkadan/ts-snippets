type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type A = {
  foo: number;
  bar: number;
};

type B = Record<'foo' | 'bar', string>; //

type ParametersExceptFirst<T extends () => any> = T extends (_arg1: unknown, ...args: infer U) => any ? U : never;

export type NeverProperties<T extends string> = { [k in T]?: never };

class Logger {
  public trace(input: Record<string, unknown>): void;
  public trace(input: string, meta?: Record<string, unknown> & NeverProperties<'msg'>): void;
  public trace(input: Error, meta?: Record<string, unknown> & NeverProperties<'err'>): void;
  public trace(input: Record<string, unknown> | string | Error, meta?: Record<string, unknown>): void {}
}
