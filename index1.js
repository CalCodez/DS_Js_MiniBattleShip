const readline = require('readline-sync');

class BattleshipGame {
  constructor () {
    this.gridSize = 10;
    this.ships = [2, 3, 3, 4, 5];
    this.grid = this.buildGrid();
    this.shipLocations = this.placeShips();
  }

  buildGrid = () => {
    const grid = [];
    for (let i = 0; i < this.gridSize; i++) {
      const row = [];
      for (let j = 0; j < this.gridSize; j++) {
        row.push('-');
      }
      grid.push(row);
    }
    return grid;
  };

  generateRandomLocation = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const row = alphabet[Math.floor(Math.random() * this.gridSize)];
    const column = Math.floor(Math.random() * this.gridSize) + 1;
    return `${row}${column}`;
  };

  isValidLocation = (location) => {
    const regex = new RegExp(`^[A-${String.fromCharCode(64 + this.gridSize)}][1-${this.gridSize}]$`);
    return regex.test(location);
  };

  placeShips = () => {
    const shipLocations = [];
    for (const shipSize of this.ships) {
      let shipLocation;
      do {
        shipLocation = this.generateRandomLocation();
      } while (!this.isValidShipLocation(shipLocation, shipSize, shipLocations));
      shipLocations.push({ location: shipLocation, size: shipSize });
    }
    return shipLocations;
  };

  isValidShipLocation = (location, shipSize, shipLocations) => {
    if (!this.isValidLocation(location)) return false;
    const intersectingLocations = new Set();
    const [row, column] = location.split('');
    const rowIdx = row.charCodeAt(0) - 65;
    const colIdx = parseInt(column) - 1;

    if ((location.endsWith('10') && shipSize + colIdx > this.gridSize) ||
      (rowIdx + shipSize > this.gridSize)) {
      return false;
    }

    for (const ship of shipLocations) {
      for (let i = 0; i < shipSize; i++) {
        if (ship.location.includes('10')) {
          intersectingLocations.add(location);
          intersectingLocations.add(`${row}${parseInt(column) + i}`);
        } else {
          intersectingLocations.add(location);
          intersectingLocations.add(`${String.fromCharCode(row.charCodeAt(0) + i)}${column}`);
        }
      }
    }
    return intersectingLocations.size === shipSize * 2;
  };

  playGame = () => {
    let shipsRemaining = this.shipLocations.length;

    while (shipsRemaining > 0) {
      const userInput = readline.question("> ");

      if (!this.isValidLocation(userInput)) {
        console.log("Invalid input. Please enter a valid location (e.g., 'A2'): ");
        continue;
      }

      let hit = false;

      for (const ship of this.shipLocations) {
        if (userInput === ship.location) {
          hit = true;
          ship.size--;
          if (ship.size === 0) {
            shipsRemaining--;
            console.log(`Hit! You have sunk a battleship. ${shipsRemaining} ship(s) remaining.`);
          } else {
            console.log("Hit!");
          }
          break;
        }
      }

      if (!hit) {
        console.log("You have missed!");
      }
    }

    console.log("You have destroyed all battleships. Would you like to play again? (Y/N)");
    const playAgain = readline.question("> ").toUpperCase();

    if (playAgain === 'Y') {
      const newGame = new BattleshipGame();
      newGame.playGame();
    } else {
      console.log("Thanks for playing. Goodbye!");
      process.exit(0);
    }
  };
}

// Start the game
const game = new BattleshipGame();
game.playGame();
