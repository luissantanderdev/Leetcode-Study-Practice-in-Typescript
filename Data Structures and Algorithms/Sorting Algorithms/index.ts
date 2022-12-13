import { Sort } from '../../Data Structures and Algorithms/Models';

class InsertionSort implements Sort {
  sort<T>(a: T[]) {
    let i: number, j: number;
    let len: number = a.length;

    i = 1;

    while (i < len) {
      j = i;

      while (j > 0 && a[j - 1] > a[j]) {
        let temp: T = a[j];
        a[j] = a[j - 1];
        a[j - 1] = temp;
        j = j - 1;
      }
      i = i + 1;
    }
  }
}

class SelectionSort implements Sort {
  sort<T>(a: T[]) {
    let i: number, j: number, len: number, min: number, temp: T;

    len = a.length;

    for (i = 0; i < len - 1; i++) {
      min = i;

      for (j = i + 1; j < len; j++) if (a[j] < a[min]) min = j;

      if (min != i) {
        temp = a[min];
        a[min] = a[i];
        a[i] = temp;
      }
    }
  }
}

class MergeSort implements Sort {
  private merge<T>(a: T[], b: T[]): T[] {
    let aPointer = 0;
    let bPointer = 0;

    let c: T[] = [];

    while (aPointer < a.length && bPointer < b.length) {
      if (a[aPointer] > b[bPointer]) {
        c.push(b[bPointer++]);
      } else {
        c.push(a[aPointer++]);
      }
    }

    while (aPointer < a.length) {
      c.push(a[aPointer++]);
    }

    while (bPointer < b.length) {
      c.push(b[bPointer++]);
    }

    return c;
  }

  private mergeSort<T>(a: T[], len: number) {
    if (len === 1) return a;

    let mid = Math.floor(len / 2);

    let l1: T[] = a.slice(0, mid);
    let l2: T[] = a.slice(mid, len);

    l1 = this.mergeSort(l1, l1.length);
    l2 = this.mergeSort(l2, l2.length);

    return this.merge(l1, l2);
  }

  sort<T>(a: T[]) {
    this.mergeSort(a, a.length);
  }
}

class QuickSort implements Sort {
  private swap<T>(a: T[], i1: number, i2: number) {
    const temp: T = a[i1];
    a[i1] = a[i2];
    a[i2] = temp;
  }

  private partition<T>(a: T[], left: number, right: number, pivot: T): number {
    let leftPtr = left;
    let rightPtr = right;

    while (true) {
      while (a[++leftPtr] < pivot) {}

      while (rightPtr > 0 && a[--rightPtr] > pivot) {}

      if (leftPtr >= rightPtr) break;
      else this.swap(a, leftPtr, rightPtr);
    }

    this.swap(a, leftPtr, rightPtr);
    return leftPtr;
  }

  private quickSort<T>(a: T[], left: number, right: number) {
    console.log(left, right);

    if (right - left <= 0) return;
    else {
      let pivot = a[right];
      let partial = this.partition<T>(a, left, right, pivot);
      this.quickSort(a, left, partial - 1);
      this.quickSort(a, partial + 1, right);
    }
  }

  sort<T>(a: T[]) {
    this.quickSort<T>(a, 0, a.length - 1);
  }
}

class SortingManager {
  static selectedSortingAlgorithm: Sort;

  public static setSortingAlgorithm(selected: Sort): void {
    this.selectedSortingAlgorithm = selected;
  }

  public static sort<T>(array: T[]) {
    this.selectedSortingAlgorithm.sort(array);
  }

  public static test() {
    let testArray1: number[] = [
      342, 32, 124, 5, 1, 35, 5325, 23, 2342, 5, 234, 234, 2356463463, 231, 0,
      -1, 342,
    ];

    let testArray2: number[] = [342, 32, 500, 230];

    const algorithm: number = 4;

    console.log('Orginal List: ', testArray2);

    switch (algorithm) {
      case 1:
        SortingManager.setSortingAlgorithm(new InsertionSort());
        SortingManager.sort(testArray1);
        break;
      case 2:
        SortingManager.setSortingAlgorithm(new SelectionSort());
        SortingManager.sort(testArray1);
        break;
      case 3:
        SortingManager.setSortingAlgorithm(new MergeSort());
        SortingManager.sort<number>(testArray2);
        break;
      case 4:
        SortingManager.setSortingAlgorithm(new QuickSort());
        SortingManager.sort<number>(testArray2);
        break;
      default:
        console.log('Resorting to regular JS sorting');
        testArray1.sort();
    }

    console.log('Result: ', testArray2);
  }
}

export { Sort, InsertionSort, SortingManager };
