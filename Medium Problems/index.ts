// MARK: 5. Longest Palindromic Substring
// Brute Force

// Constraints
// 1 <= s.length <= 1000
// s consist of only digits and English letters.

// Edge Cases #3
// No Palindromes
// Empty String

function checkIfItsPalindrome(s: string): boolean {
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s.charAt(left) != s.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

function longestPalindrome(s: string): string {
  if (s.length === 1) return s;

  let longesStrSoFar = { max: 0, longStr: '' };

  for (let i: number = 0; i < s.length; i++) {
    for (let j: number = i + 1; j <= s.length; j++) {
      let temp = s.substring(i, j);

      let isPalindrome = checkIfItsPalindrome(temp);

      if (isPalindrome) {
        if (temp.length > longesStrSoFar.max) {
          longesStrSoFar.max = temp.length;
          longesStrSoFar.longStr = temp;
        }
      }
    }
    console.log(longesStrSoFar);
  }

  return longesStrSoFar.longStr;
}

// Brute Force Solution O(n^2); with Space O(n)
function lengthOfLongestSubstring(s: string): number {
  const allSubstrings: string[] = [];

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      allSubstrings.push(s.substring(i, j));
    }
  }

  console.log(allSubstrings);

  let longestSubstringSizeInSet: number = 0;

  for (let i = 0; i < allSubstrings.length; i++) {
    const map1 = new Map();
    let repeating: boolean = false;

    for (let j = 0; j < allSubstrings[i].length; j++) {
      let c: string = allSubstrings[i].charAt(j);

      if (!map1.has(c)) {
        map1.set(c, 0);
      } else {
        repeating = true;
        break;
      }
    }

    if (!repeating) {
      longestSubstringSizeInSet = Math.max(
        longestSubstringSizeInSet,
        allSubstrings[i].length
      );
    }
  }

  return longestSubstringSizeInSet;
}

// Optimal Solution O(n) and Space O(1)
function lengthOfLongestSubstringOptimal(s: string) {
  if (s.length === 0) return 0;
  if (s.length === 1) return 1;

  let lp: number, rp: number, max: number;

  lp = 0;
  rp = 0;
  max = 0;

  while (rp < s.length - 1 && lp <= rp) {
    let pointer = lp;
    while (pointer <= rp) {
      if (s.charAt(pointer) == s.charAt(rp + 1)) {
        lp = pointer + 1;
      }
      pointer += 1;
    }
    rp += 1;
    if (rp - lp + 1 > max) {
      max = rp - lp + 1;
    }
  }

  return max;
}

// MARK: 155 - Min Stack
// ------------------------------------------------------------------------------------
class MinStack {
  storage: number[];
  minValues: number[];

  // Pointers
  topPtr: number;

  constructor() {
    this.storage = [];
    this.minValues = [];
    this.topPtr = -1;
  }

  push(val: number): void {
    if (this.topPtr === -1) {
      this.minValues.push(val);
    } else if (val <= this.minValues[this.minValues.length - 1]) {
      this.minValues.push(val);
    }

    this.topPtr++;
    this.storage.push(val);
  }

  pop(): void {
    if (
      this.storage[this.topPtr] === this.minValues[this.minValues.length - 1]
    ) {
      this.minValues.pop();
    }

    this.topPtr--;
    this.storage.pop();
  }

  top(): number {
    return this.topPtr >= 0 ? this.storage[this.topPtr] : -1;
  }

  getMin(): number {
    return this.minValues[this.minValues.length - 1];
  }
}

class LeetcodeMedium {
  static test3(): void {
    const optimal = true;
    // const stringTests: string[] = ['abcabcbb', 'bbbbb', 'pwwkew'];
    const stringTests: string[] = ['', 'abc'];

    stringTests.forEach((str: string, index: number) => {
      console.log('Original String Passed:', str);
      console.log('Test ', index + 1);
      let res: number = optimal
        ? lengthOfLongestSubstringOptimal(str)
        : lengthOfLongestSubstring(str);
      console.log('Result: ', res);
    });
  }

  static test5(): void {
    const optimal = false;

    const stringTests: string[] = ['babad', 'a', 'babad'];

    stringTests.forEach((str: string, index: number) => {
      console.log('Original String Passed:', str);
      console.log('Test ', index + 1);

      let res: string = longestPalindrome(str);

      console.log('Result: ', res);
    });
  }

  static test155(): void {
    const minStack: MinStack = new MinStack();

    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    minStack.getMin(); // return -3
    minStack.pop();
    minStack.top(); // return 0
    minStack.getMin(); // return -2
  }

  static test347(): void {
    function partition(keys, map, left, right): number {
      let pivot = keys[Math.floor(left + right / 2)];
      let pivotValue = map.get(pivot);

      let temp1 = keys[pivot];
      keys[pivot] = keys[right];
      keys[right] = temp1;

      let index = left;

      for (let i = left; i <= right; i++) {
        if (map.get(keys[i]) < pivotValue) {
          temp1 = keys[i];
          keys[i] = keys[index];
          keys[index] = temp1;
          index;
        }
      }

      temp1 = keys[right];
      keys[right] = keys[index];
      keys[index] = temp1;

      return index;
    }

    function select(
      keys: number[],
      map: Map<number, number>,
      left: number,
      right: number,
      kSmallest: number
    ) {
      console.log(map);
      console.log(keys);

      while (left != right) {
        let pivot = partition(keys, map, left, right);

        if (kSmallest === pivot) return;

        if (kSmallest < pivot) right = pivot - 1;
        else left = pivot + 1;
      }
    }

    function topKFrequent(nums: number[], k: number): number[] {
      if (nums.length === 1) return nums;

      let map: Map<number, number> = new Map();
      let highestFrequencyInSet = 0;

      for (let i = 0; i < nums.length; i++) {
        let value = nums[i];
        if (map.has(value)) {
          let f = map.get(value);

          highestFrequencyInSet = Math.max(highestFrequencyInSet, ++f);

          map.set(value, f);
        } else {
          map.set(value, 1);
        }
      }

      let frequencyBuckets = [];

      for (let i = 0; i <= highestFrequencyInSet; i++) {
        frequencyBuckets.push([]);
      }

      for (let [value, frequency] of map) {
        frequencyBuckets[frequency].push(value);

        let list = frequencyBuckets[frequency];

        if (list.length > 1) {
          // Swap
          const temp = list[list.length - 1];
          list[list.length - 1] = list[list.length - 2];
          list[list.length - 2] = temp;

          frequencyBuckets[frequency] = list;
        }
      }

      let res = [];

      for (let i = 0; i < frequencyBuckets.length; i++) {
        let list = frequencyBuckets.pop();

        while (list.length > 0) {
          let val = list.pop();

          res.push(val);

          --k;

          if (k === 0) return res;
        }
      }

      return res;
    }

    // Testing
    let l1 = [7, 10, 11, 5, 2, 5, 5, 7, 11, 8, 9];
    let k = 4;

    let res = topKFrequent(l1, k);

    console.log(res);
  }

  // MARK:
  static test167() {
    /**
     *  How it works
     *  Example: [2, 7, 11, 15]
     *    L.                     R
     *  [ 2 ,    7,      11,     15]
     *
     *    L.             R
     *  [ 2,     7,      11,     15]
     *
     *    L      R
     *  [ 2,     7,      11,     15]
     */

    function twoSumOptimized(numbers: number[], target: number) {
      let [left, right]: [number, number] = [0, numbers.length - 1];

      while (right != 0) {
        if (numbers[left] + numbers[right] === target)
          return [left + 1, right + 1];
        if (numbers[left] + numbers[right] < target) left++;
        if (numbers[left] + numbers[right] > target) right--;
      }

      return [-1, -1];
    }

    function twoSum(numbers: number[], target: number): number[] {
      let [left, right]: [number, number] = [0, numbers.length - 1];

      while (right != 0) {
        if (left == right) {
          right--;
          left = 0;
        }

        if (numbers[left] + numbers[right] === target)
          return [left + 1, right + 1];

        left++;
      }

      return [];
    }

    const tests = [
      [2, 7, 11, 15],
      [2, 3, 4],
      [-1, 0],
    ];
    const targets = [9, 6, -1];

    tests.forEach((val, index) => {
      console.log(
        'input=',
        val,
        'target=',
        targets[index],
        'result=',
        twoSumOptimized(tests[index], targets[index])
      );
    });

    // console.log('target=', 9, 'result=', twoSum(tests[0], 9));
    // console.log('target=', 6, 'result=', twoSum(tests[1], 6));
  }

  // ===================================================================================================================
  // MARK: 238 - Product of Array Except Self
  // URL: https://leetcode.com/problems/product-of-array-except-self/submissions/862371603/
  // Completion: Submitted
  static test238(): void {
    // Brute Force Solution My Solution
    // Time Complexity O(N)
    // Space Complexity O(N)
    function productExceptSelf(nums: number[]): number[] {
      let i: number, j: number, len: number;
      let prefix: number[], postfix: number[];

      len = nums.length;

      // Create the Prefix Array and The Post Fix Array
      prefix = Array.apply(null, { length: len }) as number[];
      postfix = Array.apply(null, { length: len }) as number[];

      // Prefix * Postfix Multiplication
      for (i = 0, j = len - 1; i < len && j >= 0; i++, j--) {
        if (i === 0) {
          prefix[0] = nums[i];
          postfix[len - 1] = nums[j];
        } else {
          prefix[i] = nums[i] * prefix[i - 1];
          postfix[j] = nums[j] * postfix[j + 1];
        }
      }

      let output: number[] = Array.apply(null, { length: len });
      i = 0;

      while (i < len) {
        if (i === 0) output[i] = 1 * postfix[i + 1];
        else if (i + 1 === len) output[i] = prefix[i - 1] * 1;
        else output[i] = prefix[i - 1] * postfix[i + 1];
        i++;
      }

      return output;
    }

    // Best Case Solution
    // Time: O(N)
    // Space: O(1)

    var productExceptSelfOptimized = (nums) => {
      var carryForward = (nums, products, product = 1) => {
        for (let index = 0; index < nums.length; index++) {
          /* Time O(N) */
          products[index] = product; /* Ignore Auxillary Space O(N) */
          product *= nums[index];
        }
      };

      var carryBackward = (nums, products, product = 1) => {
        for (let index = nums.length - 1; 0 <= index; index--) {
          /* Time O(N) */
          products[index] *= product; /* Ignore Auxillary Space O(N) */
          product *= nums[index];
        }
      };

      const products = new Array(nums.length).fill(
        1
      ); /* Ignore Auxillary Space O(N) */

      carryForward(
        nums,
        products
      ); /* Time O(N) | Ignore Auxillary Space O(N) */
      carryBackward(
        nums,
        products
      ); /* Time O(N) | Ignore Auxillary Space O(N) */

      return products;
    };

    // Testing
    const tests = [
      [1, 2, 3, 4],
      [-1, 1, 0, -3, 3],
    ];

    tests.forEach((val, index) => {
      console.log('test=', index, 'input=', val);
      // let res = productExceptSelf(val);
      let res = productExceptSelfOptimized(val);
      console.log(res);
    });
  }

  // MARK: 74 - Search a 2D Matrix
  static test74(): void {
    // Brute Force Solution 
    // Time: O(logn) * O(n) = O(n * logn)
    // Space: O(1) 
    function searchMatrix(matrix: number[][], target: number): boolean {
      let len: number = matrix.length;

      let right, left;

      left = 0;
      right = len - 1;

      while (right >= left) {
        let rowPivot = Math.floor((right + left) / 2);

        if (target === matrix[rowPivot][0]) return true;

        if (target < matrix[rowPivot][0]) {
          console.log('Scanning the left row ');

          // Brute Force
          for (let i = 0; i < matrix[left].length; i++)
            if (target === matrix[left][i]) return true;

          right = rowPivot - 1;
        } else if (target > matrix[rowPivot][0]) {
          console.log('Scanning the rowPivot row');

          for (let i = 0; i < matrix[rowPivot].length; i++)
            if (target === matrix[left][i]) return true;

          left = rowPivot + 1;
        }
      }

      return false;
    }

    let tests = [
      [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
    ];
    let targets = [3, 34];

    tests.forEach((matrix, index) => {
      console.log('test=', index, 'input=', matrix);

      let res = searchMatrix(matrix, targets[index]);

      console.log(
        'does the target=',
        targets[index],
        'exist in the 2d matrix=',
        res
      );
    });
  }

  static test(): void {
    const whichTest: number = 74;

    switch (whichTest) {
      case 3:
        this.test3();
        break;
      case 5:
        this.test5();
        break;
      case 74:
        this.test74();
        break;
      case 155:
        this.test155();
        break;
      case 167:
        this.test167();
        break;
      case 238:
        this.test238();
        break;
      case 347:
        this.test347();
        break;
      default:
        console.log('No Test Selected');
    }
  }
}

export default LeetcodeMedium;
