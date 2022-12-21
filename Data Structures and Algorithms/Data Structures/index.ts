import ArrayList from './ArrayList';
import { ListNode } from '../Models';

class LinkedList {
  // MARK: Insert At The Beginning
  // DESC: Inserts a node at the beginning of the list
  static insertNodeAtTheBeginning(list, value: number) {
    const newNode: ListNode<number> = new ListNode(value);

    if (list.root === null) {
      list.root = newNode;
    } else {
      newNode.next = list.root;
      list.root = newNode;
    }

    return newNode;
  }

  // MARK: Insert
  // DESC: Inserts a node at the end of the list T: O(N)
  static add(list, value: number) {
    const newNode: ListNode<number> = new ListNode(value);

    if (list.root === null) {
      list.root = newNode;
    } else {
      let temp: ListNode<number> = list.root;

      while (temp.next != null) {
        temp = temp.next;
      }

      temp.next = newNode;
    }

    return newNode;
  }

  // MARK: Delete from beginning T: O(1)
  static deleteFromBeginning(list) {
    list.root = list.root.next;
  }

  // MARK: Delete from end T: O(N)
  static delete(list) {
    let temp = list.root;

    while (temp.next.next != null) {
      temp = temp.next;
    }

    temp.next = null;
  }

  // MARK: Traverse the Linked List 
  static traverse(list: ListNode<number>) {
      
  }

}

export { ArrayList, LinkedList };
