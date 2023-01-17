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

  traversalDFS(matrix: number[][]) {
    const seen = new Array(matrix.length).fill(0);
  }

  traverse(matrix: any) {
    this.traversalDFS(matrix);
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
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
      [17, 18, 19, 20],
    ];

    const testMatrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
    ];

    const algorithm: string = 'right';

    switch (algorithm) {
      case 'right':
        this.setGraphAlgorithm(new RightDiagonal()).traverse(matrix);
        break;
      case 'dfs':
        this.setGraphAlgorithm(new DepthFirstSearchAlgorithm()).traverse(
          matrix
        );
        break;
      default:
    }

    // this.printGraph(matrix);
  }
}

export { GraphManager };
