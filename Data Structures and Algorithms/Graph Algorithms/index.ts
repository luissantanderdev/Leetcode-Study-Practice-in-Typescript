import { Graph } from '../../Data Structures and Algorithms/Models';

class RightDiagonal implements Graph {
  traverse(matrix: any) {
    for (let i = 0; i < matrix.length - 1; i++) {
      for (let j = i; j < i + 1; j++) {
        console.log(matrix[i][j]);
      }
    }
  }
}

// MARK: DFS - Depth First Search
class DepthFirstSearchAlgorithm implements Graph {
  directions: number[][] = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];

  dfs(
    matrix: number[][],
    row: number,
    col: number,
    seen: boolean[][],
    values: number[]
  ) {
    if (
      row < 0 ||
      col < 0 ||
      row >= matrix.length ||
      col >= matrix[0].length ||
      seen[row][col]
    )
      return;

    values.push(matrix[row][col]);
    seen[row][col] = true;

    for (let i = 0; i < this.directions.length; i++) {
      const currentDir: number[] = this.directions[i];

      this.dfs(matrix, row + currentDir[0], col + currentDir[1], seen, values);
    }
  }

  traversalDFS(matrix: number[][]): number[] {
    const seen: boolean[][] = new Array(matrix.length).fill(0).map(() => {
      return new Array(matrix[0].length).fill(false);
    });

    const values: number[] = [];

    this.dfs(matrix, 0, 0, seen, values);

    return values;
  }

  traverse(matrix: any) {
    this.traversalDFS(matrix);
  }
}

// MARK: BFS - Breath First Search
// NOTE: Breath First Search utilizes a diamond pattern of searching utilizign a queue data structure ^ > v < going in these directions.
// Time: O(n)
// Space: O(n);
class BreathFirstSearch implements Graph {
  directions: number[][] = [
    [-1, 0], // up ^
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ];

  traverseBFS(matrix: number[][]): number[] {
    const seen: boolean[][] = new Array(matrix.length)
      .fill(0)
      .map(() => new Array(matrix[0].length).fill(false));

    const values = [];
    const queue = [[0, 0]];

    while (queue.length) {
      const currentPos = queue.shift();
      const row = currentPos[0];
      const col = currentPos[1];

      if (
        row < 0 ||
        row >= matrix.length ||
        col < 0 ||
        col >= matrix[0].length ||
        seen[row][col]
      )
        continue;

      seen[row][col] = true;
      values.push(matrix[row][col]);

      for (let i = 0; i < this.directions.length; i++) {
        const currentDir = this.directions[i];
        queue.push([row + currentDir[0], col + currentDir[1]]);
      }
    }
    return values;
  }

  traverse(matrix: any) {
    this.traverseBFS(matrix);
  }

  static newInstance(): BreathFirstSearch {
    return new BreathFirstSearch();
  }
}

class GraphManager {
  static selectedGraphAlgorithm: Graph;

  static printGraph(matrix) {
    for (let i = 0; i < matrix.length; i++)
      for (let j = 0; j < matrix[i].length; j++) console.log(matrix[i][j]);
  }

  static setGraphAlgorithm(algorithm: Graph): Graph {
    this.selectedGraphAlgorithm = algorithm;
    return this.selectedGraphAlgorithm;
  }

  static test() {
    const matrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
    ];

    const algorithm: string = 'bfs';

    switch (algorithm) {
      case 'right':
        this.setGraphAlgorithm(new RightDiagonal()).traverse(matrix);
        break;
      case 'dfs':
        this.setGraphAlgorithm(new DepthFirstSearchAlgorithm()).traverse(
          matrix
        );
        break;
      case 'bfs':
        this.setGraphAlgorithm(BreathFirstSearch.newInstance()).traverse(
          matrix
        );
        break;
      default:
    }

    // this.printGraph(matrix);
  }
}

export { GraphManager };
