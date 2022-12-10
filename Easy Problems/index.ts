import { ListNode } from '../Data Structures and Algorithms/Models';

// MARK: 26. Remove Duplicates from Sorted Array
// URL: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
function removeDuplicates(nums: number[]): number[] {
  if (nums.length === 1) return nums;

  console.log(nums); 

  let foundDuplicatePtr = -1; 

  function swap(a, i, j) {
      let temp = a[i]; 
      a[i] = a[j]; 
      a[j] = temp; 
  }


  let dPtr = -1; 

  for (let i = 1; i < nums.length; i++) {

      if (nums[i] === -101) {
        
      }
  }

  console.log(nums);

  return nums;
}

function mergeTwoLists(
  list1: ListNode<number> | null,
  list2: ListNode<number> | null
): ListNode<number> | null {
  let dummy = new ListNode(101);
  let tail = dummy;

  while (list1 && list2) {
    if (list1.value < list2.value) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  if (list1) {
    tail.next = list1;
  } else if (list2) {
    tail.next = list2;
  }

  return dummy.next;
}

class LeetcodeEasy {
  static test1() {
    let list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
    let list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

    let newList = mergeTwoLists(list1, list2);

    let temp = newList;

    while (temp != null) {
      console.log(temp.value);

      temp = temp.next;
    }
  }

  // MARK: 26. Test
  static test26() {
      const array = [0, 1, -101, -101, 2, -101]; 

      removeDuplicates(array); 
  }

  static test(): void {
    const whichTest: number = 26;

    switch (whichTest) {
      case 1:
        this.test1();
        break;
      case 26:
        this.test26();
        break;
      default:
        console.log('No Test Selected');
    }
  }
}

export { LeetcodeEasy };
