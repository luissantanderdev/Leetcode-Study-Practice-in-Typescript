import { List } from '../../Data Structures and Algorithms/Interfaces';

class ArrayList<T> implements List<T> {
  private storage: T[] = [];
  private MAX_SIZE: number;
  private currPointer: number = 0;
  private _size: number = 0;

  constructor(_size: number = 10) {
    this.MAX_SIZE = _size;

    // Create the array
    for (let i = 0; i < this.MAX_SIZE; i++) {
      this.storage.push(null);
    }
  }

  add(e: T): boolean;
  add(e: T, index: number): void;
  add(e: T, index?: number): boolean | void {
    if (!index) {
      this.storage[this.currPointer++] = e;
      this._size++;
    }

    if (
      index &&
      index >= 0 &&
      index < this.MAX_SIZE &&
      index < this.currPointer
    ) {
      this.storage[index] = e;
    }

    return false;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  get size(): number {
    return this._size;
  }
}

export default ArrayList;
