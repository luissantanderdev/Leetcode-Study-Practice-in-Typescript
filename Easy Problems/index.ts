import { ListNode } from '../Data Structures and Algorithms/Models';

// MARK: 26. Remove Duplicates from Sorted Array
// URL: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
function removeDuplicatesBruteForce(nums: number[]): number[] {
  // Brute Force Solution O(n^2) + O(n^2) = O(2n^2)
  if (nums.length === 1) return nums;

  function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] != nums[j]) {
        i = j - 1;
        break;
      } else {
        nums[j] = -101;
      }
    }
  }

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === -101) {
      for (let j = i; j < nums.length; j++) {
        if (nums[j] != -101) {
          swap(nums, i, j);
          break;
        }
      }
    }
  }

  console.log(nums);

  return nums;
}

function removeDuplicates(nums: number[]): number[] {
  let picker = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] != nums[picker]) {
      nums[++picker] = nums[i];
    }
  }

  return nums;
}

function removeElement(nums: number[], val: number): number {
  return [];
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
  static test26(): void {
    const array = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 6];
    // const array2 = [0, 1, -101, -101, 2, -101, 3, 4, 5, -101];

    // removeDuplicat10es(array);
    let res = removeDuplicates(array);
    console.log(res);
  }

  // MARK: 27
  static test27(): void {
    // Function 
    function removeElement(nums: number[], val: number): number[] {
      if (val === 0) return nums; 

      let ptr = 0; 
      let len = nums.length; 

      while (ptr < len) {

        if (nums[ptr] === val) {

          for (let j = ptr; j < len; j++) {
              if (nums[j] != val) {
                  // Swap 
                  let temp = nums[ptr]; 
                  nums[ptr] = nums[j]; 
                  nums[j] = temp; 
                  break; 
              }
          }
        }

        ptr++; 
      }

      return nums;
    }
    

    // Testing 
    const list1 = [3,2,2,3]; 
    const val = 3; 

    let res = removeElement(list1, val); 

    console.log(res); 

  }

  static test(): void {
    const whichTest: number = 27;

    switch (whichTest) {
      case 1:
        this.test1();
        break;
      case 26:
        this.test26();
        break;
      case 27:
        this.test27();
        break;
      default:
        console.log('No Test Selected');
    }
  }
}

export { LeetcodeEasy };
