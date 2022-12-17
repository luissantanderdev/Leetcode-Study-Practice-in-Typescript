import { ListNode } from '../Data Structures and Algorithms/Models';

// MARK: 26. Remove Duplicates from Sorted Array
// URL: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
// Brute Force Solution O(n^2) + O(n^2) = O(2n^2)
function removeDuplicatesBruteForce(nums: number[]): number[] {
  let temp: number;
  if (nums.length === 1) return nums;

  function swap(a, i, j) {
    temp = a[i];
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
  let picker: number, i: number;

  picker = 0;

  for (i = 1; i < nums.length; i++) {
    if (nums[i] != nums[picker]) {
      nums[++picker] = nums[i];
    }
  }

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
    function removeElement(nums: number[], val: number): number {
      let len: number, ptr: number, k: number, i: number;

      if (nums.length === 0) return 0;

      len = nums.length;
      ptr = len - 1;
      k = 0;

      while (ptr >= 0) {
        if (nums[ptr] === val) k++;

        if (nums[ptr] != val) {
          i = 0;

          while (i != ptr) {
            if (nums[i] === val) {
              // Swap
              let temp = nums[i];
              nums[i] = nums[ptr];
              nums[ptr] = temp;
              k++;
              break;
            }

            i++;
          }
        }

        ptr--;
      }

      return len - k;
    }

    // Optimized Solution
    function removeElementOptimized(nums: number[], val: number): number {
      let i: number, ptr: number, len: number;

      if (nums.length === 0) return 0;

      len = nums.length;
      i = 0;
      ptr = len - 1;

      while (i != ptr) {
        if (nums[ptr] != val) {
          if (nums[i] === val) {
            // Swap
            let temp = nums[i];
            nums[i] = nums[ptr];
            nums[ptr] = temp;
            ptr--;
          }

          i++;
        } else {
          ptr--;
        }
      }

      return ptr;
    }

    // Testing
    const list1 = [2, 2, 2, 2, 2, 2, 2];
    const list2 = [0, 1, 2, 2, 3, 0, 4, 2];

    let res = 0;
    let testList = list1;
    let val = 2;

    console.log('Original Array: ', testList);
    res = removeElementOptimized(testList, val);
    console.log('Val Removed', res, testList);

    // What the judge sees
    for (let i = 0; i < res; i++) {
      console.log(list2[i]);
    }
  }

  // MARK: 704: Binary Search
  static test704(): void {
    let result: number, t: number;

    function search(nums: number[], target: number): number {
      let len: number, left: number, right: number, pivot: number;

      len = nums.length;

      left = 0;
      right = len - 1;

      pivot = Math.floor((right - left) / 2);

      while (left != right) {
        if (target === nums[pivot]) return;

        if (target > nums[pivot]) {
          left = pivot;

          // Recalculate Pivot for the right side.
          pivot = Math.floor((left + right) / 2);
        } else {
          right = pivot;

          // Recalculate Pivot for the left side.
          pivot = Math.floor((right - left) / 2);
        }
      }

      return -1;
    }

    const tests = [
      [-1, 0, 3, 5, 9, 12],
      [-1, 0, 3, 5, 9, 12],
    ];

    t = 9;

    result = search(tests[0], t);

    console.log(result);
  }

  // ===================================================================================================================
  // MARK: 35. Search Insert Position
  // Submitted
  // URL: https://leetcode.com/problems/search-insert-position/submissions/860456433/
  static test35() {
    // Function
    // ---------------------
    function searchInsert(nums: number[], target: number): number {
      // Use Binary Search to find the target would be positioned at

      // inclusive range search for example target is 7 and the left = 6 and right = 8 return index between them.
      // Reference the left side to see

      let left: number,
        right: number,
        len: number,
        pivot: number,
        pivotValue: number;

      // Set initial Params
      len = nums.length;
      left = 0;
      right = len - 1;

      while (left <= right) {
        // Set Initial Pivot
        pivot = left + Math.floor((right - left) / 2);
        pivotValue = nums[pivot];

        if (pivotValue === target) return pivot;

        if (target > pivotValue) {
          left = pivot + 1;
        } else if (target < pivotValue) {
          right = pivot - 1;
        }
      }

      return left;
    }
    // Testing
    // ---------------------
    let list: number[] = [1, 3, 5, 6];
    let target = 5;
    let n = list.length;
    // Print
    console.log('List size n=', n, 'target=', target, list);
    let res = searchInsert(list, target);
    console.log('Index Position', res);

    list = [1, 3, 5, 6];
    target = 1;
    n = list.length;
    // Print
    console.log('List size n=', n, 'target=', target, list);
    res = searchInsert(list, target);
    console.log('Index Position', res);

    list = [1, 3, 5, 6];
    target = 6;
    n = list.length;
    // Print
    console.log('List size n=', n, 'target=', target, list);
    res = searchInsert(list, target);
    console.log('Index Position of target=', target, res);
  }

  // =================================================================================================
  // MARK: 135 - Valid Palindrome
  // Submitted with R: 80ms and M: 47.7mb
  // URL: https://leetcode.com/problems/valid-palindrome/submissions/860895786/
  static test135() {
    function checkIfIsAlphaNumeric(code: number): boolean {
      return !(code > 47 && code < 58) &&
        !(code > 64 && code < 91) &&
        !(code > 96 && code < 123)
        ? false
        : true;
    }

    function isPalindrome(s: string): boolean {
      let left: number,
        right: number,
        leftCharCode: number,
        rightCharCode: number;
      let isLeftAlpha: boolean, isRightAlpha: boolean;

      left = 0;
      right = s.length - 1;

      // O(N) complexity
      while (left <= right) {
        leftCharCode = s[left].toLowerCase().charCodeAt(0);
        rightCharCode = s[right].toLowerCase().charCodeAt(0);
        isLeftAlpha = checkIfIsAlphaNumeric(leftCharCode);
        isRightAlpha = checkIfIsAlphaNumeric(rightCharCode);

        if (isLeftAlpha && isRightAlpha && leftCharCode - rightCharCode != 0)
          return false;

        if (leftCharCode === rightCharCode) {
          left++;
          right--;
        } else if (!isLeftAlpha) {
          left++;
        } else if (!isRightAlpha) {
          right--;
        }
      }

      return true;
    }

    // Testing
    // -------------------------
    const str1: string = 'racecax';
    const str2: string = 'raceca r';
    const str3: string = ' racecar ';
    const str4: string = 'Sore was I ere I saw Eros.';
    let str: string;
    let result: boolean;

    // str = str1;
    // result = isPalindrome(str);

    // str = str2;
    // result = isPalindrome(str);

    str = str4;
    console.log('result=', isPalindrome(str));
  }

  static test(): void {
    const whichTest: number = 135;

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
      case 35:
        this.test35();
        break;
      case 135:
        this.test135();
        break;
      case 704:
        this.test704();
        break;
      default:
        console.log('No Test Selected');
    }
  }
}

export { LeetcodeEasy };
