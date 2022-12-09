interface List<T> {
  add(e: T): boolean;
  add(e: T, index: number): void;
  isEmpty(): boolean;
  get size(): number;
}

export { List };
