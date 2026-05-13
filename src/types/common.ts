export type Setter<T> = (value: T | ((prev: T) => T)) => void;
