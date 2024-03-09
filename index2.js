// mini Battleship part2


const readlineSync = require('readline-sync');

class Ship {
  constructor (length) {
    this.length = length;
    this.locations = [];
    this.hits = 0;
  }

  isSunk() {
    return this.hits === this.length;
  }

  generateRandomLocation(gridSize) {
    const alphabet = 'ABCDEFGHIJ';
    const row = Math.floor(Math.random() * gridSize) + 1;
    const column = alphabet.charAt(Math.floor(Math.random() * gridSize));
    return column + row;
  }
}

class Game {
  constructor (gridSize) {
    this.gridSize = gridSize;
    this.ships = [
      new Ship(2),
      new Ship(3),
      new Ship(3),
      new Ship(4),
      new Ship(5)
    ];
    this.board = this.buildGrid();
    this.remainingShips = this.ships.length;
  }

  buildGrid() {
    const grid = [];
    for (let i = 0; i < this.gridSize; i++) {
      grid[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        grid[i][j] = ' ';
      }
    }
    return grid;
  }

  printBoard() {
    for (let row of this.board) {
      console.log(row.join(' '));
    }
  }

  play() {
    console.log("Press any key to start the game.");
    readlineSync.keyIn();
    console.log("Game started!");

    // Place ships randomly
    for (let ship of this.ships) {
      let location;
      do {
        location = ship.generateRandomLocation(this.gridSize);
      } while (!this.isValidLocation(location));
      ship.locations.push(location);
    }

    this.printBoard();
    console.log("Enter a location to strike (e.g., 'A2'): ");
    // Implement the logic to handle the game
  }

  isValidLocation(location) {
    const alphabet = 'ABCDEFGHIJ';
    const row = parseInt(location.slice(1));
    const column = location.charAt(0);
    return alphabet.includes(column) && row >= 1 && row <= this.gridSize;
  }
}

const game = new Game(10);
game.play();
