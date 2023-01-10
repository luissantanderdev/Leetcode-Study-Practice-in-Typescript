import { Graph } from '../../Data Structures and Algorithms/Models';

class DiagonalSearchAlgorithm implements Graph {
  traverse(matrix) {}
}

class RightDiagonal implements Graph {
  traverse(matrix) {
    for (let i = 0; i < matrix.length - 1; i++) {
      for (let j = i; j < i + 1; j++) {
        console.log(matrix[i][j]);
      }
    }
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

    const algorithm: string = 'right';

    switch (algorithm) {
      case 'right':
        this.setGraphAlgorithm(new RightDiagonal()).traverse(matrix);
        break;
      default:
    }

    // this.printGraph(matrix);
  }
}

export { GraphManager };
