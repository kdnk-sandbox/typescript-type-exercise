type PartialRequire<O, K extends keyof O> = {
  [P in K]-?: O[P];
} &
  O;

// PartialRequire<Options, 'foo'> | PartialRequire<Options, 'bar'> | PartialRequire<Options, 'baz'>

type RequireOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? PartialRequire<T, K>
  : never;
