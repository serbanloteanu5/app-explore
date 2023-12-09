// File Name: ComplexCodeExample.js

/*
This code demonstrates a complex algorithm for generating a maze.
The maze is generated using the Depth-First Search algorithm with backtracking.

Please note that this code is for illustrative purposes only and may not be optimized.
*/

class MazeGenerator {
  constructor(rows, columns) {
    this.numRows = rows;
    this.numColumns = columns;
    this.maze = [];

    // Initialize the maze with walls
    for (let row = 0; row < this.numRows; row++) {
      let mazeRow = [];
      for (let col = 0; col < this.numColumns; col++) {
        mazeRow.push("#");
      }
      this.maze.push(mazeRow);
    }
  }

  generateMaze() {
    let currentCell = [0, 0];
    let stack = [];

    this.maze[currentCell[0]][currentCell[1]] = " "; // Set the starting cell as empty

    while (true) {
      let neighbors = this.getUnvisitedNeighbors(currentCell[0], currentCell[1]);

      if (neighbors.length > 0) {
        let randomNeighborIndex = Math.floor(Math.random() * neighbors.length);
        let randomNeighbor = neighbors[randomNeighborIndex];

        stack.push(currentCell);
        this.removeWall(currentCell, randomNeighbor);
        currentCell = randomNeighbor;
        this.maze[currentCell[0]][currentCell[1]] = " ";
      } else if (stack.length > 0) {
        currentCell = stack.pop();
      } else {
        // Maze generation complete
        break;
      }
    }
  }

  getUnvisitedNeighbors(row, col) {
    let neighbors = [];

    const directions = [
      [0, -2], // Up
      [-2, 0], // Left
      [0, 2],  // Down
      [2, 0]   // Right
    ];

    for (let [dx, dy] of directions) {
      let neighborRow = row + dx;
      let neighborCol = col + dy;

      if (this.isValidCell(neighborRow, neighborCol) && this.maze[neighborRow][neighborCol] === "#") {
        neighbors.push([neighborRow, neighborCol]);
      }
    }

    return neighbors;
  }

  removeWall(currentCell, neighborCell) {
    let wallRow = currentCell[0] + Math.floor((neighborCell[0] - currentCell[0]) / 2);
    let wallCol = currentCell[1] + Math.floor((neighborCell[1] - currentCell[1]) / 2);
    this.maze[wallRow][wallCol] = " ";
  }

  isValidCell(row, col) {
    return row >= 0 && row < this.numRows && col >= 0 && col < this.numColumns;
  }

  printMaze() {
    for (let row = 0; row < this.numRows; row++) {
      console.log(this.maze[row].join(""));
    }
  }
}

// Usage:

const mazeGenerator = new MazeGenerator(21, 41); // Create a 21x41 maze
mazeGenerator.generateMaze();
mazeGenerator.printMaze();
