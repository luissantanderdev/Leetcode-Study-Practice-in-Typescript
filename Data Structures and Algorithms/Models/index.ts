import { Graph } from './Graph Algorithm Models';
import { Sort } from './Sorting Algorithm Models';

class ListNode<T> {
  value: T;
  next: ListNode<T>;

  constructor(value: T, next: ListNode<T> = null) {
    this.value = value;
    this.next = next;
  }
}

export { Graph, Sort, ListNode };
