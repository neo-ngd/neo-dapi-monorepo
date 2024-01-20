type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type UnionToOvlds<U> = UnionToIntersection<U extends unknown ? (f: U) => void : never>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

export type UnionConcat<U extends string, Sep extends string> = PopUnion<U> extends infer SELF
  ? SELF extends string
    ? Exclude<U, SELF> extends never
      ? SELF
      :
          | `${UnionConcat<Exclude<U, SELF>, Sep>}${Sep}${SELF}`
          | UnionConcat<Exclude<U, SELF>, Sep>
          | SELF
    : never
  : never;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type ExpandRecursively<T> = T extends Record<string, any>
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;
