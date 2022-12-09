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

  static test(): void {
    const whichTest: number = 155;

    switch (whichTest) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        this.test3();
        break;
      case 5:
        this.test5();
        break;
      case 155:
        this.test155();
        break;
      default:
        console.log('No Test Selected');
    }
  }
}

export default LeetcodeMedium;
